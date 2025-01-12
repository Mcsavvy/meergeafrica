import React from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

type DeactivateAccountModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onDeactivate: () => void;
};

const DeactivateAccountModal = ({
  isOpen,
  onClose,
  onDeactivate,
}: DeactivateAccountModalProps) => {
  const handleDeactivate = async () => {
    try {
      // Here you would typically make an API call to deactivate the account
      await onDeactivate();
      onClose();
    } catch (error) {
      console.error("Error deactivating account:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} id="deactivate-account-modal">
      <Modal.Header>Deactivate Account</Modal.Header>
      <Modal.Body>
        <div className="space-y-4">
          <p>
            This will shut down your account. Your account will be reactivated
            when you sign in again.
          </p>
          <p className="font-medium">
            Are you sure you want to deactivate your account?
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline" onClick={onClose}>
          CANCEL
        </Button>
        <Button variant="destructive" onClick={handleDeactivate}>
          PROCEED
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeactivateAccountModal;
