import { BaseIssue, BaseSchema, is } from 'valibot';

/**
 * Valibotスキーマを使用したジェネリクス型ガード関数
 */
export function createValibotTypeGuard<
  TInput,
  TOutput,
  TSchema extends BaseSchema<TInput, TOutput, BaseIssue<unknown>>,
>(schema: TSchema) {
  // TOutput がこのジェネリクス型ガードの対象となる型
  type R = TOutput;

  // data is R がジェネリクス型ガードの役割を果たす
  return function isType(data: unknown): data is R {
    // is(schema, data) が true なら、data は TOutput 型であることを保証
    return is(schema, data);
  };
}
