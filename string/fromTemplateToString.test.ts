import { expect } from '../../chai/init'
import { fromTemplateToString } from './fromTemplateToString'

test(fromTemplateToString.name, () => {
  const from = 'example@example.com'
  const title = 'New title'
  expect(fromTemplateToString('{{from}}', { from })).to.equal(from)
  expect(fromTemplateToString('From: {{from}} \n Title: {{title}}', { from, title })).to.equal(`From: ${from} \n Title: ${title}`)
  // expect(result).not.to.match(substitutionRegExp) // should not contain non-replaced substitutions
})
