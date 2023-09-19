export class DescriptionUtils {
  static selectUnique(arrays: string[][]): string[] {
    const candidates = DescriptionUtils.lengthFilter(arrays);
    const selected: string[] = [];
    const seen = new Set<string>();

    for (const arr of candidates) {
      let found = false;

      for (const value of arr) {
        if (!seen.has(value)) {
          selected.push(value);
          seen.add(value);
          found = true;
          break;
        }
      }

      if (!found) {
        return candidates.map((e) => e[0]); // No solution found.
      }
    }

    return selected;
  }

  static lengthFilter(arrays: string[][]): string[][] {
    const filtered = arrays.map((arr) => {
      const filtered = arr.filter((value) => {
        return value.length < 80;
      });
      if (filtered.length > 0) {
        return filtered;
      } else {
        return arr;
      }
    });

    return filtered;
  }
}
