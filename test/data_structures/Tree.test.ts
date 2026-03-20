import {expect, test} from "bun:test";
import {GeneralTree} from "../../src/data_structures/trees/Tree.ts"

test("behavior of basic tree", () => {
    const sut1 = new GeneralTree<string>("Mahmoud");
    GeneralTree.insert(sut1.root!, "Mansour");
    GeneralTree.insert(sut1.root?.children[0]!, "Hojat");

    expect(sut1.traverse()).toBe("└──Mahmoud\n  └──Mansour\n    └──Hojat\n");

    const sut2 = new GeneralTree<number>();
    expect(sut2.traverse()).toBe("");
});