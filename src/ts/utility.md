# ts 的内置工具类型

[官方文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Awaited&lt;Type&gt;

Example

```typescript
type A = Awaited<Promise<string>>;

//type A = string

type B = Awaited<Promise<Promise<number>>>;

//type B = number

type C = Awaited<boolean | Promise<number>>;

//type C = number | boolean
```

Source

```typescript
/**
 * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
 */

type Awaited<T> = T extends null | undefined
  ? T // special case for `null | undefined` when not in `--strictNullChecks` mode
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any } // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
  ? F extends (value: infer V, ...args: infer _) => any // if the argument to `then` is callable, extracts the first argument
    ? Awaited<V> // recursively unwrap the value
    : never // the argument to `then` was not callable
  : T; // non-object or non-thenable
```

## Partial&lt;Type&gt;

构造一个类型，其中 Type 的所有属性都设置为可选。此实用程序将返回一个类型，该类型表示给定类型的所有子集。

Example

```typescript
interface Todo {
  title: string;
  description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
  return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
  title: 'organize desk',
  description: 'clear clutter',
};

const todo2 = updateTodo(todo1, {
  description: 'throw out trash',
});
```

Source

```typescript
/**
 * Make all properties in T optional
 */

type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

## Required&lt;Type&gt;

构造一个类型，该类型由设置为 required 的 Type 的所有属性组成。Partial 的反义词。

Example

```typescript
interface Props {
  a?: number;
  b?: string;
}

const obj: Props = { a: 5 };

const obj2: Required<Props> = { a: 5 };
```

::: danger
Property 'b' is missing in type '{ a: number; }' but required in type 'Required&lt;Props&gt;'.
:::

Source

```typescript
/**
 * Make all properties in T required
 */

type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

## Readonly&lt;Type&gt;

构造一个类型，其中 Type 的所有属性都设置为 readonly，这意味着无法重新赋值构造类型的属性。

Example

```typescript
interface Todo {
  title: string;
}

const todo: Readonly<Todo> = {
  title: 'Delete inactive users',
};

todo.title = 'Hello';
```

::: danger
Cannot assign to 'title' because it is a read-only property..
:::

souce

```typescript
/**
 * Make all properties in T readonly
 */
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## Record&lt;Keys, Type&gt;

构造一个对象类型，其属性键为 Keys，属性值为 Type。此实用工具可用于将一个类型的属性映射到另一个类型。

Example

```typescript
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: Record<CatName, CatInfo> = {
  miffy: { age: 10, breed: 'Persian' },
  boris: { age: 5, breed: 'Maine Coon' },
  mordred: { age: 16, breed: 'British Shorthair' },
};

//cats.boris;

//const cats: Record<CatName, CatInfo>
```

source

```typescript
/**
 * Construct a type with a set of properties K of type T
 */
type Record<K extends keyof any, T> = {
  [P in K]: T;
};
```

## Pick&lt;Type, Keys&gt;

通过从 Type 中选取属性键集（字符串文本或字符串文本的并集）来构造类型

Example

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = Pick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
};

todo;

const todo: TodoPreview;
```

source

```typescript
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};
```

## Omit&lt;Type, Keys&gt;

通过从 Type 中选取所有属性，然后删除 Key（字符串文本或字符串文本的并集）来构造类型。与 Pick 相反。
Example

```typescript
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

type TodoPreview = Omit<Todo, 'description'>;

const todo: TodoPreview = {
  title: 'Clean room',
  completed: false,
  createdAt: 1615544252770,
};

todo;

const todo: TodoPreview;

type TodoInfo = Omit<Todo, 'completed' | 'createdAt'>;

const todoInfo: TodoInfo = {
  title: 'Pick up kids',
  description: 'Kindergarten closes at 5pm',
};

todoInfo;

const todoInfo: TodoInfo;
```

source

```typescript
/**
 * Construct a type with the properties of T except for those in type K.
 */
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

## Exclude&lt;UnionType, ExcludedMembers&gt;

通过从 UnionType 中排除可分配给 ExcludedMembers 的所有联合成员来构造类型。

Example

```typescript
type T0 = Exclude<'a' | 'b' | 'c', 'a'>;

type T0 = 'b' | 'c';
type T1 = Exclude<'a' | 'b' | 'c', 'a' | 'b'>;

type T1 = 'c';
type T2 = Exclude<string | number | (() => void), Function>;

type T2 = string | number;

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };

type T3 = Exclude<Shape, { kind: 'circle' }>;

type T3 =
  | {
      kind: 'square';
      x: number;
    }
  | {
      kind: 'triangle';
      x: number;
      y: number;
    };
```

source

```typescript
/**
 * Exclude from T those types that are assignable to U
 */
type Exclude<T, U> = T extends U ? never : T;
```

## Extract&lt;Type, Union&gt;

通过从 Type 中提取可分配给 Union 的所有联合成员来构造类型。

Example

```typescript
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;

type T0 = 'a';
type T1 = Extract<string | number | (() => void), Function>;

type T1 = () => void;

type Shape =
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; x: number }
  | { kind: 'triangle'; x: number; y: number };

type T2 = Extract<Shape, { kind: 'circle' }>;

type T2 = {
  kind: 'circle';
  radius: number;
};
```

source

```typescript
/**
 * Extract from T those types that are assignable to U
 */
type Extract<T, U> = T extends U ? T : never;
```

## NonNullable&lt;Type&gt;

Example

```typescript
type T0 = NonNullable<string | number | undefined>;

type T0 = string | number;
type T1 = NonNullable<string[] | null | undefined>;

type T1 = string[];
```

source

```typescript
/**
 * Exclude null and undefined from T
 */
type NonNullable<T> = T & {};
```

## Parameters&lt;Type&gt;

根据函数类型 Type 的参数中使用的类型构造元组类型。对于重载函数，这将是最后一个签名的参数;请参阅在条件类型中推断。

Example

```typescript
declare function f1(arg: { a: number; b: string }): void;

type T0 = Parameters<() => string>;

type T0 = [];
type T1 = Parameters<(s: string) => void>;

type T1 = [s: string];
type T2 = Parameters<<T>(arg: T) => T>;

type T2 = [arg: unknown];
type T3 = Parameters<typeof f1>;

type T3 = [
  arg: {
    a: number;
    b: string;
  }
];
type T4 = Parameters<any>;

type T4 = unknown[];
type T5 = Parameters<never>;

type T5 = never;
type T6 = Parameters<string>;

//Type 'string' does not satisfy the constraint '(...args: any) => any'.

type T6 = never;
type T7 = Parameters<Function>;

//Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//Type 'Function' provides no match for the signature '(...args: any): any'.

type T7 = never;
```

source

```typescript
/**
 * Obtain the parameters of a function type in a tuple
 */
type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;
```

## ConstructorParameters&lt;Type&gt;

从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（如果 Type 不是函数，则生成该类型，则从不生成该类型）。

Example

```typescript
type T0 = ConstructorParameters<ErrorConstructor>;

type T0 = [message?: string];
type T1 = ConstructorParameters<FunctionConstructor>;

type T1 = string[];
type T2 = ConstructorParameters<RegExpConstructor>;

type T2 = [pattern: string | RegExp, flags?: string];
class C {
  constructor(a: number, b: string) {}
}
type T3 = ConstructorParameters<typeof C>;

type T3 = [a: number, b: string];
type T4 = ConstructorParameters<any>;

type T4 = unknown[];

type T5 = ConstructorParameters<Function>;

//Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//Type 'Function' provides no match for the signature 'new (...args: any): any'.

type T5 = never;
```

source

```typescript
/**
 * Obtain the parameters of a constructor function type in a tuple
 */
type ConstructorParameters<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: infer P) => any ? P : never;
```

## ReturnType&lt;Type&gt;

构造由函数 Type 的返回类型组成的类型。
对于重载函数，这将是最后一个签名的返回类型;请参阅在条件类型中推断。

Example

```typescript
declare function f1(): { a: number; b: string };

type T0 = ReturnType<() => string>;

type T0 = string;
type T1 = ReturnType<(s: string) => void>;

type T1 = void;
type T2 = ReturnType<<T>() => T>;

type T2 = unknown;
type T3 = ReturnType<<T extends U, U extends number[]>() => T>;

type T3 = number[];
type T4 = ReturnType<typeof f1>;

type T4 = {
  a: number;
  b: string;
};
type T5 = ReturnType<any>;

type T5 = any;
type T6 = ReturnType<never>;

type T6 = never;
type T7 = ReturnType<string>;
//Type 'string' does not satisfy the constraint '(...args: any) => any'.

type T7 = any;
type T8 = ReturnType<Function>;
//Type 'Function' does not satisfy the constraint '(...args: any) => any'.
//Type 'Function' provides no match for the signature '(...args: any): any'.

type T8 = any;
```

source

```typescript
/**
 * Obtain the return type of a function type
 */
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

## InstanceType&lt;Type&gt;

构造一个类型，该类型由 Type 中构造函数的实例类型组成。

Example

```typescript
class C {
  x = 0;
  y = 0;
}

type T0 = InstanceType<typeof C>;

type T0 = C
type T1 = InstanceType<any>;

type T1 = any
type T2 = InstanceType<never>;

type T2 = never
type T3 = InstanceType<string>;
Type 'string' does not satisfy the constraint 'abstract new (...args: any) => any'.

type T3 = any
type T4 = InstanceType<Function>;
//Type 'Function' does not satisfy the constraint 'abstract new (...args: any) => any'.
//Type 'Function' provides no match for the signature 'new (...args: any): any'.

type T4 = any

```

source

```typescript
/**
 * Obtain the return type of a constructor function type
 */
type InstanceType<T extends abstract new (...args: any) => any> =
  T extends abstract new (...args: any) => infer R ? R : any;
```

## ThisParameterType&lt;Type&gt;

提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则提取 unknown

Example

```typescript
function toHex(this: Number) {
  return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n);
}
```

source

```typescript
/**
 * Extracts the type of the 'this' parameter of a function type, or 'unknown' if the function type has no 'this' parameter.
 */
type ThisParameterType<T> = T extends (this: infer U, ...args: never) => any
  ? U
  : unknown;
```

## OmitThisParameter&lt;Type&gt;

从 Type 中删除 this 参数。如果 Type 没有显式声明此参数，则结果只是 Type。否则，将从 Type 创建不带此参数的新函数类型。泛型将被擦除，并且只有最后一个重载签名会传播到新的函数类型中。

Example

```typescript
function toHex(this: Number) {
  return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);

console.log(fiveToHex());
```

source

```typescript
/**
 * Removes the 'this' parameter from a function type.
 */
type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;
```

## ThisType&lt;Type&gt;

此实用程序不返回转换后的类型。相反，它充当上下文此类型的标记。请注意，必须启用 noImplicitThis 标志才能使用此实用程序。

Example

```typescript
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);
```

source

```typescript
/**
 * Marker for contextual 'this' type
 */
interface ThisType<T> {}
```

::: details
在上面的示例中，makeObject 参数中的方法对象具有包含 ThisType&lt;D & M&gt;的上下文类型，因此 methods 对象中方法中的 this 类型为 { x： number， y： number } & { moveBy（dx： number， dy： number）： void }。请注意，methods 属性的类型如何同时是推理目标和 this 类型的源。

ThisType&lt;T&gt; 标记接口只是在 lib.d.ts 中声明的空接口。除了在以下方面得到认可

:::

## Uppercase&lt;StringType&gt;

## Lowercase&lt;StringType&gt;

## Capitalize&lt;StringType&gt;

## Uncapitalize&lt;StringType&gt;
