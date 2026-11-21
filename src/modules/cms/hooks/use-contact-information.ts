import { useState } from "react";

import {
  initialContactInformation,
  saveContactInformationMock,
} from "../api/contact-information.mock";
import type {
  ContactInformation,
  ContactInformationField,
} from "../types/contact-information";

export function useContactInformation() {
  const [settings, setSettings] = useState<ContactInformation>(
    initialContactInformation,
  );
  const [savedSettings, setSavedSettings] = useState<ContactInformation>(
    initialContactInformation,
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: ContactInformationField, value: string) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = saveContactInformationMock(settings);
    setSettings(savedData);
    setSavedSettings(savedData);
    setIsSaved(true);
  };

  const handleReset = () => {
    setSettings({ ...savedSettings });
    setIsSaved(false);
  };

  const isValid =
    Boolean(settings.phone.trim()) &&
    Boolean(settings.whatsapp.trim()) &&
    Boolean(settings.email.trim()) &&
    Boolean(settings.serviceHours.trim());

  return {
    settings,
    isSaved,
    isValid,
    handleChange,
    handleSave,
    handleReset,
  };
}
