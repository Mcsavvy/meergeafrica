import { AddOn } from "@/types/menu";

type AddOnEventDetails = {
  addOn: AddOn;
};

export type AddOnCreateEvent = CustomEvent<{ name?: string }>;
export type AddOnCreatedEvent = CustomEvent<AddOnEventDetails>;
export type AddOnSelectedEvent = CustomEvent<AddOnEventDetails>;
export type AddOnUpdateEvent = CustomEvent<AddOnEventDetails>;
export type AddOnUpdatedEvent = CustomEvent<AddOnEventDetails>;
export type AddOnDeletedEvent = CustomEvent<AddOnEventDetails>;

export const ADD_ON_CREATE = "add-on-create";
export const ADD_ON_CREATED = "add-on-created";
export const ADD_ON_SELECTED = "add-on-selected";
export const ADD_ON_UPDATE = "add-on-update";
export const ADD_ON_UPDATED = "add-on-updated";
export const ADD_ON_DELETED = "add-on-deleted";

const debug = (event: string, details: unknown) => {
  console.debug(`[AddOn Event] ${event}:`, details);
};

export const addOnCreateEvent = (details: { name?: string }) => {
  debug(ADD_ON_CREATE, details);
  return new CustomEvent(ADD_ON_CREATE, { detail: details });
};

export const addOnCreatedEvent = (details: AddOnEventDetails) => {
  debug(ADD_ON_CREATED, details);
  return new CustomEvent(ADD_ON_CREATED, { detail: details });
};

export const addOnSelectedEvent = (details: AddOnEventDetails) => {
  debug(ADD_ON_SELECTED, details);
  return new CustomEvent(ADD_ON_SELECTED, { detail: details });
};

export const addOnUpdateEvent = (details: AddOnEventDetails) => {
  debug(ADD_ON_UPDATE, details);
  return new CustomEvent(ADD_ON_UPDATE, { detail: details });
};

export const addOnUpdatedEvent = (details: AddOnEventDetails) => {
  debug(ADD_ON_UPDATED, details);
  return new CustomEvent(ADD_ON_UPDATED, { detail: details });
};

export const addOnDeletedEvent = (details: AddOnEventDetails) => {
  debug(ADD_ON_DELETED, details);
  return new CustomEvent(ADD_ON_DELETED, { detail: details });
};

export const onAddOnCreate = (callback: (event: AddOnCreateEvent) => void) => {
  debug(`Adding listener for ${ADD_ON_CREATE}`, callback);
  window.addEventListener(ADD_ON_CREATE, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_CREATE}`, callback);
    window.removeEventListener(ADD_ON_CREATE, callback as EventListener);
  };
};

export const onAddOnCreated = (
  callback: (event: AddOnCreatedEvent) => void
) => {
  debug(`Adding listener for ${ADD_ON_CREATED}`, callback);
  window.addEventListener(ADD_ON_CREATED, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_CREATED}`, callback);
    window.removeEventListener(ADD_ON_CREATED, callback as EventListener);
  };
};

export const onAddOnSelected = (
  callback: (event: AddOnSelectedEvent) => void
) => {
  debug(`Adding listener for ${ADD_ON_SELECTED}`, callback);
  window.addEventListener(ADD_ON_SELECTED, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_SELECTED}`, callback);
    window.removeEventListener(ADD_ON_SELECTED, callback as EventListener);
  };
};

export const onAddOnUpdate = (callback: (event: AddOnUpdateEvent) => void) => {
  debug(`Adding listener for ${ADD_ON_UPDATE}`, callback);
  window.addEventListener(ADD_ON_UPDATE, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_UPDATE}`, callback);
    window.removeEventListener(ADD_ON_UPDATE, callback as EventListener);
  };
};

export const onAddOnUpdated = (
  callback: (event: AddOnUpdatedEvent) => void
) => {
  debug(`Adding listener for ${ADD_ON_UPDATED}`, callback);
  window.addEventListener(ADD_ON_UPDATED, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_UPDATED}`, callback);
    window.removeEventListener(ADD_ON_UPDATED, callback as EventListener);
  };
};

export const onAddOnDeleted = (
  callback: (event: AddOnDeletedEvent) => void
) => {
  debug(`Adding listener for ${ADD_ON_DELETED}`, callback);
  window.addEventListener(ADD_ON_DELETED, callback as EventListener);
  return () => {
    debug(`Removing listener for ${ADD_ON_DELETED}`, callback);
    window.removeEventListener(ADD_ON_DELETED, callback as EventListener);
  };
};

export const emitAddOnCreate = (details: { name?: string }) => {
  debug(`Emitting ${ADD_ON_CREATE}`, details);
  return window.dispatchEvent(addOnCreateEvent(details));
};

export const emitAddOnCreated = (details: AddOnEventDetails) => {
  debug(`Emitting ${ADD_ON_CREATED}`, details);
  return window.dispatchEvent(addOnCreatedEvent(details));
};

export const emitAddOnSelected = (details: AddOnEventDetails) => {
  debug(`Emitting ${ADD_ON_SELECTED}`, details);
  return window.dispatchEvent(addOnSelectedEvent(details));
};

export const emitAddOnUpdate = (details: AddOnEventDetails) => {
  debug(`Emitting ${ADD_ON_UPDATE}`, details);
  return window.dispatchEvent(addOnUpdateEvent(details));
};

export const emitAddOnUpdated = (details: AddOnEventDetails) => {
  debug(`Emitting ${ADD_ON_UPDATED}`, details);
  return window.dispatchEvent(addOnUpdatedEvent(details));
};

export const emitAddOnDeleted = (details: AddOnEventDetails) => {
  debug(`Emitting ${ADD_ON_DELETED}`, details);
  return window.dispatchEvent(addOnDeletedEvent(details));
};
