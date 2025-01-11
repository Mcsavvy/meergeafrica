import React, { useState, useEffect, useCallback } from "react";
import { Check } from "lucide-react";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type CustomLinkModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type ValidationState = {
  isValid: boolean;
  message: string;
};

const CustomLinkModal = ({ isOpen, onClose }: CustomLinkModalProps) => {
  const [businessName, setBusinessName] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [validation, setValidation] = useState<ValidationState>({
    isValid: false,
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);
  const [finalLink, setFinalLink] = useState("");
  const baseUrl = "www.mergeafrica.com/";

  // Generate suggestions based on input
  useEffect(() => {
    if (businessName.length > 0) {
      const newSuggestions = [
        `${businessName.toLowerCase()}_stores`,
        `${businessName.toLowerCase()}stores`,
        `${businessName.toLowerCase()}group234`,
        `${businessName.toLowerCase()}_business123`,
      ];
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [businessName]);

  // Validate business name
  const validateBusinessName = (name: string) => {
    if (name.length === 0) return { isValid: false, message: "" };
    if (name.length < 3)
      return {
        isValid: false,
        message: "Business name must be at least 3 characters",
      };
    if (!/^[a-zA-Z0-9_]+$/.test(name)) {
      return {
        isValid: false,
        message: "Only letters, numbers, and underscores are allowed",
      };
    }
    return { isValid: true, message: "Name available!" };
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBusinessName(value);
    setValidation(validateBusinessName(value));
    setIsSuccess(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setBusinessName(suggestion);
    setValidation(validateBusinessName(suggestion));
  };

  const handleSubmit = () => {
    if (validation.isValid) {
      setFinalLink(`${baseUrl}${businessName.toLowerCase()}`);
      setIsSuccess(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(finalLink);
  };

  const handleClose = useCallback(() => {
    setBusinessName("");
    setSuggestions([]);
    setValidation({ isValid: false, message: "" });
    setIsSuccess(false);
    setFinalLink("");
    onClose();
  }, [
    onClose,
    setBusinessName,
    setSuggestions,
    setValidation,
    setIsSuccess,
    setFinalLink,
  ]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-md"
      id="custom-link-modal"
    >
      <Modal.Header>Create Custom Link</Modal.Header>
      <Modal.Body>
        {!isSuccess ? (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Create a unique link with your business name
              <br />
              <span className="text-xs">e.g. {baseUrl}yourbusinessname</span>
            </p>

            <div className="space-y-4">
              <div>
                <Input
                  value={businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  className={`w-full ${
                    validation.isValid
                      ? "border-green-500"
                      : validation.message
                      ? "border-red-500"
                      : ""
                  }`}
                />
                {validation.message && (
                  <p
                    className={`text-sm mt-1 ${
                      validation.isValid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {validation.message}
                  </p>
                )}
              </div>

              {suggestions.length > 0 && !validation.isValid && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Suggested names:</p>
                  {suggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      className="block w-full text-left"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">
              Your unique link has been created!
            </h3>
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="w-8 h-8 text-green-500" />
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Here&apos;s your custom link
            </p>
            <p className="text-primary font-medium">{finalLink}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {!isSuccess ? (
          <>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!validation.isValid}>
              Continue
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setIsSuccess(false)}>
              Edit
            </Button>
            <Button onClick={handleCopyLink}>Copy Link</Button>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CustomLinkModal;
