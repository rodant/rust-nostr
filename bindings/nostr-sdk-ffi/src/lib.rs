// Copyright (c) 2022 Yuki Kishimoto
// Distributed under the MIT software license

use anyhow::Result;

mod client;
mod logger;
mod subscription;
mod util;

trait FromResult<T>: Sized {
    fn from_result(_: T) -> Result<Self>;
}

#[allow(missing_docs)]
#[allow(unused_imports)]
mod ffi {
    // Extenal
    pub use nostr_ffi::{Contact, Event, Keys, Kind, KindBase, SubscriptionFilter};

    // Namespace
    pub use crate::logger::init_logger;
    pub use crate::util::time::timestamp;

    // Nostr SDK
    pub use crate::client::{Client, HandleNotification};
    pub use crate::subscription::{Channel, Subscription};

    // UDL
    uniffi_macros::include_scaffolding!("nostrsdk");
}
pub use ffi::*;
