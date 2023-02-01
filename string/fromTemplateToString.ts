export function fromTemplateToString(template: string, substitutions: Record<string, string>) {
  return Object.entries(substitutions).reduce((pattern, [search, replace]) => {
    return pattern.replace(`{{${search}}}`, replace)
  }, template)
}
