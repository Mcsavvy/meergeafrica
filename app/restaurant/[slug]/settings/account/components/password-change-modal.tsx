import React, { useCallback, useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "@/components/ui/password";
import { verifyPassword } from "@/lib/services/auth-service";
import { useZodForm } from "@/lib/hooks/form";
import { changePasswordSchema } from "@/lib/schema/authentication";
import { useDebouncedCallback } from "use-debounce";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [passwordConfirmed, setPasswordConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useZodForm({ schema: changePasswordSchema });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState("");

  const verifyCurrentPassword = useDebouncedCallback(
    async (currentPassword?: string) => {
      // const currentPassword = form.getValues().currentPassword;
      if (!currentPassword) return;
      try {
        setIsLoading(true);
        const response = await verifyPassword(currentPassword);
        setPasswordConfirmed(response.success);
        if (!response.success) {
          form.setError("currentPassword", {
            message: "Current password is incorrect",
          });
          return;
        } else {
          form.clearErrors("currentPassword");
        }
      } catch (err) {
        if (err instanceof Error) {
          form.setError("currentPassword", {
            message: err.message,
          });
        } else {
          form.setError("currentPassword", {
            message: "An error occurred while verifying password",
          });
        }
        setPasswordConfirmed(false);
      } finally {
        setIsLoading(false);
      }
      return { currentPassword };
    },
    500
  );

  useEffect(() => {
    const { unsubscribe } = form.watch((value, { name }) => {
      if (name === "currentPassword") {
        verifyCurrentPassword(value.currentPassword);
      }
    });
    return () => unsubscribe();
  }, [form, verifyCurrentPassword]);

  const onSubmit = form.handleSubmit(async ({}) => {
    setError("");
    if (!passwordConfirmed) {
      setError("Current password is incorrect");
      return;
    }

    setIsLoading(true);
    try {
      console.log("Password updated successfully");
      onClose();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
      setError("An error occurred while updating password");
    } finally {
      setIsLoading(false);
    }
  });

  const handleClose = useCallback(() => {
    form.reset();
    onClose();
  }, [form, onClose]);

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Modal isOpen={isOpen} onClose={handleClose} id="change-password-modal">
          <Modal.Header>Change Password</Modal.Header>
          <Modal.Body>
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currentPassword">
                    Current Password
                  </FormLabel>
                  <FormControl>
                    <PasswordInput loading={isLoading} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {passwordConfirmed && (
              <>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="newPassword">New Password</FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <PasswordInput {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={form.formState.isSubmitting || !passwordConfirmed}
            >
              Update Password
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </Form>
  );
};

export default ChangePasswordModal;
