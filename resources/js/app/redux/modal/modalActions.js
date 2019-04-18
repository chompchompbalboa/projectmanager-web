//-----------------------------------------------------------------------------
// Update Active Modal
//-----------------------------------------------------------------------------
export const updateActiveModal = (nextActiveModal, nextActiveId) => ({
  type: 'UPDATE_ACTIVE_MODAL',
  nextActiveId: nextActiveId,
  nextActiveModal: nextActiveModal
})