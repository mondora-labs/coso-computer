import { diff } from "deep-diff";

const getDiff = (oldValue, newValue) => {
  const diffs = diff(oldValue, newValue);

  const additions = diffs
    .filter(x => x.kind === "N")
    .map(x => ({
      field: x.path.join("."),
      value: x.rhs
    }));

  const edits = diffs
    .filter(x => x.kind === "E")
    .map(x => ({
      field: x.path.join("."),
      value: {
        old: x.lhs,
        new: x.rhs
      }
    }));

  const deletes = diffs
    .filter(x => x.kind === "D")
    .map(x => ({
      field: x.path.join("."),
      oldValue: x.lhs
    }));

  return {
    additions,
    edits,
    deletes
  };
};

export default getDiff;
