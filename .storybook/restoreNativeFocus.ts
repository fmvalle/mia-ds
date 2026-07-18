/**
 * Storybook patches HTMLElement.prototype.focus as a getter for testing.
 * React Aria (used by addon-docs) then does:
 *   const focus = HTMLElement.prototype.focus
 *   HTMLElement.prototype.focus = function () { focus.apply(this, …) }
 * which breaks with "Illegal invocation" when the getter returns an unbound
 * native/patched function. Restore a writable, properly-bound focus/blur.
 */
export function restoreNativeFocus(): void {
  if (typeof HTMLElement === 'undefined' || typeof document === 'undefined') return

  try {
    const iframe = document.createElement('iframe')
    iframe.setAttribute('aria-hidden', 'true')
    iframe.style.cssText = 'position:absolute;width:0;height:0;border:0;visibility:hidden'
    document.documentElement.appendChild(iframe)

    const win = iframe.contentWindow
    if (!win) {
      iframe.remove()
      return
    }

    const nativeFocus = win.HTMLElement.prototype.focus
    const nativeBlur = win.HTMLElement.prototype.blur
    iframe.remove()

    Object.defineProperty(HTMLElement.prototype, 'focus', {
      configurable: true,
      writable: true,
      enumerable: true,
      value: function focus(this: HTMLElement, ...args: Parameters<HTMLElement['focus']>) {
        return nativeFocus.apply(this, args)
      },
    })

    Object.defineProperty(HTMLElement.prototype, 'blur', {
      configurable: true,
      writable: true,
      enumerable: true,
      value: function blur(this: HTMLElement, ...args: Parameters<HTMLElement['blur']>) {
        return nativeBlur.apply(this, args)
      },
    })
  } catch {
    // Ignore — preview may not have document yet
  }
}

/** Block Storybook / testing-library from reinstalling getter-only focus patches. */
export function installFocusPatchGuard(): void {
  if (typeof HTMLElement === 'undefined') return
  if ((Object as unknown as { __miaFocusGuard?: boolean }).__miaFocusGuard) return
  ;(Object as unknown as { __miaFocusGuard?: boolean }).__miaFocusGuard = true

  const original = Object.defineProperties
  Object.defineProperties = function definePropertiesGuarded<T>(
    target: T,
    props: PropertyDescriptorMap & ThisType<unknown>,
  ): T {
    if (target === HTMLElement.prototype && props && ('focus' in props || 'blur' in props)) {
      const next = { ...props } as PropertyDescriptorMap
      delete next.focus
      delete next.blur
      if (Object.keys(next).length === 0) return target
      return original.call(this, target, next) as T
    }
    return original.call(this, target, props) as T
  } as typeof Object.defineProperties
}

restoreNativeFocus()
installFocusPatchGuard()
