import type { Meta, StoryObj } from '@storybook/react-vite'
import { FileUpload } from './FileUpload'
import { componentDocsParameters } from '@/docs/ComponentDocsPage'

const meta = {
  title: 'Formulários/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    ...componentDocsParameters('fileUpload'),
  },
  args: {
    label: 'Upload file',
    helperText: 'PNG, JPG or PDF up to 10MB.',
    accept: '.png,.jpg,.pdf',
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Multiple: Story = {
  args: {
    multiple: true,
    label: 'Upload files',
  },
}

export const WithError: Story = {
  args: {
    error: 'File size exceeds the limit.',
    helperText: undefined,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
