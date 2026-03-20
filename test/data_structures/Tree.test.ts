import {expect, test} from "bun:test";
import {_Node, GeneralTree} from "../../src/data_structures/Tree.ts"

test("behavior of basic tree", () => {
    const sut1 = new GeneralTree<string>("Mahmoud");
    _Node.insert(sut1.root!, "Mansour");
    _Node.insert(sut1.root?.children[0]!, "Hojat");

    expect(sut1.traverse()).toBe("└──Mahmoud\n  └──Mansour\n    └──Hojat\n");

    const sut2 = new GeneralTree<number>();
    expect(sut2.traverse()).toBe("");
});