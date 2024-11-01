const { Keys, EventBuilder, UnwrappedGift, loadWasmSync } = require("@rust-nostr/nostr-sdk");

function run() {
    loadWasmSync();

    // Sender Keys
    const alice_keys = Keys.parse("5c0c523f52a5b6fad39ed2403092df8cebc36318b39383bca6c00808626fab3a")

    // Receiver Keys
    const bob_keys = Keys.parse("nsec1j4c6269y9w0q2er2xjw8sv2ehyrtfxq3jwgdlxj6qfn8z4gjsq5qfvfk99")

    // Compose rumor
    const rumor = EventBuilder.textNote("Test", []).toUnsignedEvent(alice_keys.publicKey)

    // Build gift wrap with sender keys
    const gw = EventBuilder.giftWrap(alice_keys, bob_keys.publicKey, rumor)
    console.log("Gift Wrap: " + gw.asJson())

    // Extract rumor from gift wrap with receiver keys
    let unwrapped_gift = UnwrappedGift.fromGiftWrap(bob_keys, gw);
    console.log("Sender: ", unwrapped_gift.sender.toBech32())
    console.log("Rumor: ", unwrapped_gift.rumor.asJson())
}

module.exports.run = run;
