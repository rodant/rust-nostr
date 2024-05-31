// Copyright (c) 2022-2023 Yuki Kishimoto
// Copyright (c) 2023-2024 Rust Nostr Developers
// Distributed under the MIT software license

#[cfg(not(target_arch = "wasm32"))]
use core::time::Duration;

pub const MIN_ATTEMPTS: usize = 1;
pub const MIN_UPTIME: f64 = 0.90;

#[cfg(not(target_arch = "wasm32"))]
pub const PING_INTERVAL: u64 = 55; // Used also for latency calculation

/// Maximum number of reads to be saved in memory to calculate latency
#[cfg(not(target_arch = "wasm32"))]
pub const LATENCY_MAX_VALUES: usize = 50;

#[cfg(not(target_arch = "wasm32"))]
pub const HIGH_LATENCY: Duration = Duration::from_secs(1);
