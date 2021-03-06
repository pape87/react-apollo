import { pipe } from "fp-ts/lib/pipeable";
import * as O from "fp-ts/lib/Option";
import * as A from "fp-ts/lib/Array";
import { identity } from "fp-ts/lib/function";
import { data } from "../data/pokemons";
import { toConnection, slice } from "../functions";
import { Connection } from "../types";

interface Pokemon {
  id: string;
  name: string;
  types: string[];
}

const SIZE = 10;

export function filterByName(args: {
  after?: string;
  limit?: number;
  q?: string;
}): Connection<Pokemon> {
  const { after, q, limit = SIZE } = args;

  const filter: (as: Pokemon[]) => Pokemon[] =
    q === undefined
      ? identity
      : A.filter(p => p.name.toLowerCase().includes(q?.toLowerCase()));

  const results: Pokemon[] = pipe(
    data,
    filter,
    sliceByAfter(after),
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

export function filterByType(args: {
  after?: string;
  limit?: number;
  q?: string;
}): Connection<Pokemon> {
  const { after, q, limit = SIZE } = args;

  const filter: (as: Pokemon[]) => Pokemon[] =
    q === undefined
      ? identity
      : A.filter(p => p.types.some((t) => t.toLowerCase().includes(q.toLowerCase())));

  const results: Pokemon[] = pipe(
    data,
    filter,
    sliceByAfter(after),
    slice(0, limit + 1)
  );
  return toConnection(results, limit);
}

function sliceByAfter(after?: string): (a: Pokemon[]) => Pokemon[] {
  return after === undefined
    ? identity
    : as =>
      pipe(
        as,
        A.findIndex(a => a.id === after),
        O.map(a => a + 1),
        O.fold(() => as, idx => as.slice(idx))
      );
}