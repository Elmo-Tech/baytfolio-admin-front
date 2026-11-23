import ts from "typescript";

const printer = ts.createPrinter();
export function controls(source, file, tag, attribute, value) {
  const tree = ts.createSourceFile(
    file,
    source,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  const result = [];
  function visit(node) {
    if (
      (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) &&
      node.tagName.getText(tree) === tag
    ) {
      const attributes = node.attributes.properties;
      if (
        attributes.some(
          (attr) =>
            ts.isJsxAttribute(attr) &&
            attr.name.getText(tree) === attribute &&
            attr.initializer &&
            ts.isStringLiteral(attr.initializer) &&
            attr.initializer.text === value,
        )
      )
        result.push(
          attributes
            .filter(
              (attr) =>
                !(
                  ts.isJsxAttribute(attr) &&
                  ["className", "presentation"].includes(
                    attr.name.getText(tree),
                  )
                ),
            )
            .map((attr) =>
              printer.printNode(ts.EmitHint.Unspecified, attr, tree),
            )
            .join("\n"),
        );
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return result;
}
