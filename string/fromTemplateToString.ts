import { purry } from 'remeda'

export function fromTemplateToString(template: string, substitutions: Record<string, string>): string

export function fromTemplateToString(substitutions: Record<string, string>): (template: string) => string

export function fromTemplateToString() {
  return purry(function (template: string, substitutions: Record<string, string>) {
    return Object.entries(substitutions).reduce((pattern, [search, replace]) => {
      return pattern.replace(new RegExp(`{{${search}}}`, 'g'), replace)
    }, template)
  }, arguments)
}
