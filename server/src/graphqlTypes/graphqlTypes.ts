import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type ConversionStats = {
   __typename?: 'ConversionStats',
  totalUSDconverted: Scalars['Float'],
  totalConversions: Scalars['Int'],
  topDestinationCurrency?: Maybe<Scalars['String']>,
};

export type Currency = {
   __typename?: 'Currency',
  name: Scalars['String'],
  code: Scalars['String'],
  symbol?: Maybe<Scalars['String']>,
};

export type ExchangeResult = {
   __typename?: 'ExchangeResult',
  stats: ConversionStats,
  convertedAmount: Scalars['Float'],
  rate: Scalars['Float'],
};

export type Query = {
   __typename?: 'Query',
  availableCurrencies: Array<Currency>,
  exchangeCurrency: Scalars['Float'],
  conversionStats: ConversionStats,
};


export type QueryExchangeCurrencyArgs = {
  firstCode: Scalars['String'],
  secondCode: Scalars['String'],
  amount: Scalars['Float']
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Currency: ResolverTypeWrapper<Currency>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  ConversionStats: ResolverTypeWrapper<ConversionStats>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  ExchangeResult: ResolverTypeWrapper<ExchangeResult>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Currency: Currency,
  String: Scalars['String'],
  Float: Scalars['Float'],
  ConversionStats: ConversionStats,
  Int: Scalars['Int'],
  Boolean: Scalars['Boolean'],
  ExchangeResult: ExchangeResult,
};

export type ConversionStatsResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConversionStats'] = ResolversParentTypes['ConversionStats']> = {
  totalUSDconverted?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  totalConversions?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  topDestinationCurrency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type CurrencyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Currency'] = ResolversParentTypes['Currency']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  symbol?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type ExchangeResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExchangeResult'] = ResolversParentTypes['ExchangeResult']> = {
  stats?: Resolver<ResolversTypes['ConversionStats'], ParentType, ContextType>,
  convertedAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  rate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  availableCurrencies?: Resolver<Array<ResolversTypes['Currency']>, ParentType, ContextType>,
  exchangeCurrency?: Resolver<ResolversTypes['Float'], ParentType, ContextType, RequireFields<QueryExchangeCurrencyArgs, 'firstCode' | 'secondCode' | 'amount'>>,
  conversionStats?: Resolver<ResolversTypes['ConversionStats'], ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  ConversionStats?: ConversionStatsResolvers<ContextType>,
  Currency?: CurrencyResolvers<ContextType>,
  ExchangeResult?: ExchangeResultResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
