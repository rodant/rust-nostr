// Copyright (c) 2022-2023 Yuki Kishimoto
// Distributed under the MIT software license

//! Tag Indexes

use alloc::string::String;
use alloc::vec::Vec;

#[cfg(not(feature = "std"))]
use alloc::collections::{BTreeMap as AllocMap, BTreeSet as AllocSet};
use core::ops::{Deref, DerefMut};
#[cfg(feature = "std")]
use std::collections::{HashMap as AllocMap, HashSet as AllocSet};

use bitcoin::hashes::sha256::Hash as Sha256Hash;
use bitcoin::hashes::Hash;

use crate::Alphabet;

/// Tag Index Value Size
pub const TAG_INDEX_VALUE_SIZE: usize = 8;

/// Tag Indexes
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct TagIndexes {
    inner: AllocMap<Alphabet, TagIndexValues>,
}

impl Deref for TagIndexes {
    type Target = AllocMap<Alphabet, TagIndexValues>;
    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl DerefMut for TagIndexes {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}

impl<I, S> From<I> for TagIndexes
where
    I: Iterator<Item = Vec<S>>,
    S: AsRef<str>,
{
    fn from(iter: I) -> Self {
        let mut tag_index: TagIndexes = TagIndexes::default();
        for t in iter.filter(|t| t.len() > 1) {
            if let Some(tagnamechar) = single_char_tagname(t[0].as_ref()) {
                let mut inner: [u8; TAG_INDEX_VALUE_SIZE] = [0u8; TAG_INDEX_VALUE_SIZE];
                let hash = Sha256Hash::hash(t[1].as_ref().as_bytes());
                inner.copy_from_slice(&hash[..TAG_INDEX_VALUE_SIZE]);
                tag_index.entry(tagnamechar).or_default().insert(inner);
            }
        }
        tag_index
    }
}

#[inline]
fn single_char_tagname(tagname: &str) -> Option<Alphabet> {
    tagname
        .chars()
        .next()
        .and_then(|first| Alphabet::try_from(first).ok())
}

/// Tag Index Values
#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct TagIndexValues {
    inner: AllocSet<[u8; TAG_INDEX_VALUE_SIZE]>,
}

impl Deref for TagIndexValues {
    type Target = AllocSet<[u8; TAG_INDEX_VALUE_SIZE]>;
    fn deref(&self) -> &Self::Target {
        &self.inner
    }
}

impl DerefMut for TagIndexValues {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.inner
    }
}

impl From<&AllocSet<String>> for TagIndexValues {
    fn from(value: &AllocSet<String>) -> Self {
        Self {
            inner: value
                .iter()
                .map(|s| {
                    let mut inner = [0u8; TAG_INDEX_VALUE_SIZE];
                    let hash = Sha256Hash::hash(s.as_bytes());
                    inner.copy_from_slice(&hash[..TAG_INDEX_VALUE_SIZE]);
                    inner
                })
                .collect(),
        }
    }
}