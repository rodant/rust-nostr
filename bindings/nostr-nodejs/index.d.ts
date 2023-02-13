/* tslint:disable */
/* eslint-disable */

/* auto-generated by NAPI-RS */

/** Encrypt (NIP04) */
export function encrypt(sk: SecretKey, pk: PublicKey, text: string): string
/** Decrypt (NIP04) */
export function decrypt(sk: SecretKey, pk: PublicKey, encryptedContent: string): string
/** Verify NIP05 */
export function verifyNip05(publicKey: PublicKey, nip05: string): Promise<boolean>
/** Sign delegation (NIP26) */
export function signDelegation(keys: Keys, delegateePk: PublicKey, conditions: string): string
/** Verify delegation signature (NIP26) */
export function verifyDelegationSignature(keys: Keys, delegateePk: PublicKey, conditions: string, signature: string): boolean
export type JsEventBuilder = EventBuilder
export class EventBuilder {
  constructor(kind: bigint, content: string, tags: Array<Array<string>>)
  toEvent(keys: JsKeys): JsEvent
  toPowEvent(keys: JsKeys, difficulty: number): JsEvent
  static setMetadata(metadata: JsMetadata): JsEventBuilder
  static addRecommendedRelay(url: string): JsEventBuilder
  static newTextNote(content: string, tags: Array<Array<string>>): JsEventBuilder
  static setContactList(list: Array<JsContact>): JsEventBuilder
  static newEncryptedDirectMsg(senderKeys: JsKeys, receiverPubkey: JsPublicKey, content: string): JsEventBuilder
  static repost(eventId: JsEventId, publicKey: JsPublicKey): JsEventBuilder
  static delete(ids: Array<JsEventId>, reason?: string | undefined | null): JsEventBuilder
  static newReaction(eventId: JsEventId, publicKey: JsPublicKey, content: string): JsEventBuilder
  static newChannel(metadata: JsMetadata): JsEventBuilder
  static setChannelMetadata(channelId: JsChannelId, relayUrl: string | undefined | null, metadata: JsMetadata): JsEventBuilder
  static newChannelMsg(channelId: JsChannelId, relayUrl: string | undefined | null, content: string): JsEventBuilder
  static hideChannelMsg(messageId: JsEventId, reason?: string | undefined | null): JsEventBuilder
  static muteChannelUser(pubkey: JsPublicKey, reason?: string | undefined | null): JsEventBuilder
  static auth(challenge: string, relay: string): JsEventBuilder
}
export type JsEventId = EventId
export class EventId {
  constructor(pubkey: JsPublicKey, createdAt: bigint, kind: bigint, tags: Array<Array<string>>, content: string)
  static fromSlice(bytes: Array<number>): JsEventId
  static fromHex(hex: string): JsEventId
  static fromBech32(id: string): JsEventId
  asBytes(): Array<number>
  toHex(): string
  toBech32(): string
}
export type JsEvent = Event
export class Event {
  get id(): EventId
  get pubkey(): JsPublicKey
  get createdAt(): bigint
  get kind(): bigint
  get tags(): Array<Array<string>>
  get content(): string
  get signature(): string
  verify(): boolean
  static fromJson(json: string): JsEvent
  asJson(): string
}
export type JsPublicKey = PublicKey
export class PublicKey {
  static fromHex(hex: string): JsPublicKey
  static fromBech32(pk: string): JsPublicKey
  toHex(): string
  toBech32(): string
}
export type JsSecretKey = SecretKey
export class SecretKey {
  static fromHex(hex: string): JsSecretKey
  static fromBech32(sk: string): JsSecretKey
  toHex(): string
  toBech32(): string
}
export type JsKeys = Keys
export class Keys {
  /** Initialize from secret key. */
  constructor(secretKey: SecretKey)
  /** Initialize with public key only (no secret key). */
  static fromPublicKey(publicKey: PublicKey): JsKeys
  /** Init [`Keys`] from `hex` or `bech32` secret key string */
  static fromSkStr(secretKey: string): JsKeys
  /** Init [`Keys`] from `hex` or `bech32` public key string */
  static fromPkStr(publicKey: string): JsKeys
  /** Generate new random keys */
  static generate(): JsKeys
  /** Derive keys from BIP-39 mnemonics (ENGLISH wordlist). */
  static fromMnemonic(mnemonic: string, passphrase?: string | undefined | null): JsKeys
  /** Get public key */
  publicKey(): PublicKey
  /** Get secret key */
  secretKey(): SecretKey
}
export type JsSubscriptionId = SubscriptionId
export class SubscriptionId {
  constructor(id: string)
  /** Generate new random [`SubscriptionId`] */
  static generate(): JsSubscriptionId
  get get(): string
}
export type JsSubscriptionFilter = SubscriptionFilter
export class SubscriptionFilter {
  constructor()
  /** Set subscription id */
  id(id: string): SubscriptionFilter
  /** Set subscription ids */
  ids(ids: Array<string>): SubscriptionFilter
  /** Set author */
  author(author: PublicKey): SubscriptionFilter
  /** Set authors */
  authors(authors: Array<PublicKey>): SubscriptionFilter
  /** Set kind */
  kind(kind: bigint): SubscriptionFilter
  /** Set kinds */
  kinds(kinds: Array<bigint>): SubscriptionFilter
  /** Set event */
  event(id: EventId): SubscriptionFilter
  /** Set events */
  events(ids: Array<EventId>): SubscriptionFilter
  /** Set pubkey */
  pubkey(pubkey: PublicKey): SubscriptionFilter
  /** Set pubkeys */
  pubkeys(pubkeys: Array<PublicKey>): SubscriptionFilter
  /**
   * Set hashtag
   *
   * <https://github.com/nostr-protocol/nips/blob/master/12.md>
   */
  hashtag(hashtag: string): SubscriptionFilter
  /**
   * Set hashtags
   *
   * <https://github.com/nostr-protocol/nips/blob/master/12.md>
   */
  hashtags(hashtags: Array<string>): SubscriptionFilter
  /**
   * Set reference
   *
   * <https://github.com/nostr-protocol/nips/blob/master/12.md>
   */
  reference(v: string): SubscriptionFilter
  /**
   * Set references
   *
   * <https://github.com/nostr-protocol/nips/blob/master/12.md>
   */
  references(v: Array<string>): SubscriptionFilter
  /** Set search field */
  search(value: string): SubscriptionFilter
  /** Set since unix timestamp */
  since(since: bigint): SubscriptionFilter
  /** Set until unix timestamp */
  until(until: bigint): SubscriptionFilter
  /** Set limit */
  limit(limit: bigint): SubscriptionFilter
}
export type JsRelayInformationDocument = RelayInformationDocument
export class RelayInformationDocument {
  constructor()
  get name(): string | null
  get description(): string | null
  get pubkey(): string | null
  get contact(): string | null
  get supportedNips(): Array<number> | null
  get software(): string | null
  get version(): string | null
}
export type JsChannelId = ChannelId
/**
 * Channel Id
 *
 * Kind 40 event id (32-bytes lowercase hex-encoded)
 *
 * https://github.com/nostr-protocol/nips/blob/master/19.md
 */
export class ChannelId {
  /** New [`ChannelId`] */
  constructor(eventId: EventId, relays: Array<string>)
  /** [`ChannelId`] from bytes */
  static fromSlice(sl: Array<number>): JsChannelId
  /** [`ChannelId`] hex string */
  static fromHex(hex: string): JsChannelId
  /** [`ChannelId`] bech32 string */
  static fromBech32(id: string): JsChannelId
  /** Get as bytes */
  get asBytes(): Array<number>
  /** Get as hex string */
  get toHex(): string
  /** Get as bech32 string */
  get toBech32(): string
  /** Get relays */
  get relays(): Array<string>
}
export type JsContact = Contact
export class Contact {
  constructor(publicKey: PublicKey, relayUrl?: string | undefined | null, alias?: string | undefined | null)
}
export type JsMetadata = Metadata
export class Metadata {
  constructor()
  static fromJson(json: string): JsMetadata
  asJson(): string
  name(name: string): Metadata
  displayName(displayName: string): Metadata
  about(about: string): Metadata
  website(url: string): this
  picture(url: string): this
  banner(url: string): this
  nip05(nip05: string): Metadata
  lud06(lud06: string): Metadata
  lud16(lud16: string): Metadata
}