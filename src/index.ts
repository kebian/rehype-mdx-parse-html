import { visit } from 'unist-util-visit'
import type { Root, Node } from 'hast'

/**
 * Plugin to allow MDX to apply its component substitution to html tags
 * in markdown files.
 */
const rehypeParseMdxHtml = () => (tree: Root) => {
    const fix = (node: Node) => {
        if (node.data) delete node.data._mdxExplicitJsx
    }
    visit(tree, 'mdxJsxTextElement', node => fix(node))
    visit(tree, 'mdxJsxFlowElement', node => fix(node))
}

export default rehypeParseMdxHtml
