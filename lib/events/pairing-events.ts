import { PairedItem } from "@/types/menu";

type PairedItemEventDetails = {
  pairedItem: PairedItem;
};

export type PairedItemCreateEvent = CustomEvent<{ name?: string }>;
export type PairedItemCreatedEvent = CustomEvent<PairedItemEventDetails>;
export type PairedItemSelectedEvent = CustomEvent<PairedItemEventDetails>;
export type PairedItemUpdateEvent = CustomEvent<PairedItemEventDetails>;
export type PairedItemUpdatedEvent = CustomEvent<PairedItemEventDetails>;
export type PairedItemDeletedEvent = CustomEvent<PairedItemEventDetails>;

export const PAIRED_ITEM_CREATE = "paired-item-create";
export const PAIRED_ITEM_CREATED = "paired-item-created";
export const PAIRED_ITEM_SELECTED = "paired-item-selected";
export const PAIRED_ITEM_UPDATE = "paired-item-update";
export const PAIRED_ITEM_UPDATED = "paired-item-updated";
export const PAIRED_ITEM_DELETED = "paired-item-deleted";

const debug = (event: string, details: unknown) => {
  console.debug(`[PairedItem Event] ${event}:`, details);
};

export const pairedItemCreateEvent = (details: { name?: string }) => {
  debug(PAIRED_ITEM_CREATE, details);
  return new CustomEvent(PAIRED_ITEM_CREATE, { detail: details });
};

export const pairedItemCreatedEvent = (details: PairedItemEventDetails) => {
  debug(PAIRED_ITEM_CREATED, details);
  return new CustomEvent(PAIRED_ITEM_CREATED, { detail: details });
};

export const pairedItemSelectedEvent = (details: PairedItemEventDetails) => {
  debug(PAIRED_ITEM_SELECTED, details);
  return new CustomEvent(PAIRED_ITEM_SELECTED, { detail: details });
};

export const pairedItemUpdateEvent = (details: PairedItemEventDetails) => {
  debug(PAIRED_ITEM_UPDATE, details);
  return new CustomEvent(PAIRED_ITEM_UPDATE, { detail: details });
};

export const pairedItemUpdatedEvent = (details: PairedItemEventDetails) => {
  debug(PAIRED_ITEM_UPDATED, details);
  return new CustomEvent(PAIRED_ITEM_UPDATED, { detail: details });
};

export const pairedItemDeletedEvent = (details: PairedItemEventDetails) => {
  debug(PAIRED_ITEM_DELETED, details);
  return new CustomEvent(PAIRED_ITEM_DELETED, { detail: details });
};

// Event listeners with cleanup functions
export const onPairedItemCreate = (
  callback: (event: PairedItemCreateEvent) => void
) => {
  debug(`Adding listener for ${PAIRED_ITEM_CREATE}`, callback);
  window.addEventListener(PAIRED_ITEM_CREATE, callback as EventListener);
  return () => {
    window.removeEventListener(PAIRED_ITEM_CREATE, callback as EventListener);
  };
};

export const onPairedItemCreated = (
  callback: (event: PairedItemCreatedEvent) => void
) => {
  debug(`Adding listener for ${PAIRED_ITEM_CREATED}`, callback);
  window.addEventListener(PAIRED_ITEM_CREATED, callback as EventListener);
  return () => {
    window.removeEventListener(PAIRED_ITEM_CREATED, callback as EventListener);
  };
};

export const onPairedItemSelected = (
  callback: (event: PairedItemSelectedEvent) => void
) => {
  debug(`Adding listener for ${PAIRED_ITEM_SELECTED}`, callback);
  window.addEventListener(PAIRED_ITEM_SELECTED, callback as EventListener);
  return () => {
    window.removeEventListener(PAIRED_ITEM_SELECTED, callback as EventListener);
  };
};

export const onPairedItemUpdate = (
  callback: (event: PairedItemUpdateEvent) => void
) => {
  debug(`Adding listener for ${PAIRED_ITEM_UPDATE}`, callback);
  window.addEventListener(PAIRED_ITEM_UPDATE, callback as EventListener);
  return () => {
    window.removeEventListener(PAIRED_ITEM_UPDATE, callback as EventListener);
  };
};

export const onPairedItemUpdated = (
  callback: (event: PairedItemUpdatedEvent) => void
) => {
  debug(`Adding listener for ${PAIRED_ITEM_UPDATED}`, callback);
  window.addEventListener(PAIRED_ITEM_UPDATED, callback as EventListener);
  return () => {
    window.removeEventListener(PAIRED_ITEM_UPDATED, callback as EventListener);
  };
};

export const emitPairedItemCreate = (details: { name?: string }) => {
  debug(`Emitting ${PAIRED_ITEM_CREATE}`, details);
  return window.dispatchEvent(pairedItemCreateEvent(details));
};

export const emitPairedItemCreated = (details: PairedItemEventDetails) => {
  debug(`Emitting ${PAIRED_ITEM_CREATED}`, details);
  return window.dispatchEvent(pairedItemCreatedEvent(details));
};

export const emitPairedItemSelected = (details: PairedItemEventDetails) => {
  debug(`Emitting ${PAIRED_ITEM_SELECTED}`, details);
  return window.dispatchEvent(pairedItemSelectedEvent(details));
};

export const emitPairedItemUpdate = (details: PairedItemEventDetails) => {
  debug(`Emitting ${PAIRED_ITEM_UPDATE}`, details);
  return window.dispatchEvent(pairedItemUpdateEvent(details));
};

export const emitPairedItemUpdated = (details: PairedItemEventDetails) => {
  debug(`Emitting ${PAIRED_ITEM_UPDATED}`, details);
  return window.dispatchEvent(pairedItemUpdatedEvent(details));
};

export const emitPairedItemDeleted = (details: PairedItemEventDetails) => {
  debug(`Emitting ${PAIRED_ITEM_DELETED}`, details);
  return window.dispatchEvent(pairedItemDeletedEvent(details));
};
