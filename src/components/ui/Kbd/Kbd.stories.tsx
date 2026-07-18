import type { Meta, StoryObj } from '@storybook/react-vite'
import { Kbd, KbdGroup } from './Kbd'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Fundação/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('kbd'),
  },
  args: {
    children: 'K',
  },
} satisfies Meta<typeof Kbd>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ModifierKeys: Story = {
  render: () => (
    <KbdGroup>
      <Kbd>⌘</Kbd>
      <Kbd>K</Kbd>
    </KbdGroup>
  ),
}

export const ShortcutList: Story = {
  render: () => (
    <div className="space-y-3 text-sm text-text">
      <div className="flex items-center justify-between gap-8">
        <span>Search</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span>Save</span>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>S</Kbd>
        </KbdGroup>
      </div>
      <div className="flex items-center justify-between gap-8">
        <span>Close panel</span>
        <Kbd>Esc</Kbd>
      </div>
    </div>
  ),
}

export const AllExamples: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Kbd>Enter</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Shift</Kbd>
      <KbdGroup>
        <Kbd>Ctrl</Kbd>
        <Kbd>Alt</Kbd>
        <Kbd>Del</Kbd>
      </KbdGroup>
    </div>
  ),
}
