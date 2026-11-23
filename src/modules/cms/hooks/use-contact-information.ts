import { useState } from "react";
import { toast } from "@/shared/lib/toast";

import {
  initialContactInformation,
  saveContactInformationMock,
} from "../api/contact-information.mock";
import type {
  ContactInformation,
  ContactInformationField,
} from "../types/contact-information";
import { loadCmsStorage, saveCmsStorage } from "../utils/cms-storage";

const STORAGE_KEY = "baytfolio:cms:contact-information";

export function useContactInformation() {
  const [settings, setSettings] = useState<ContactInformation>(() =>
    loadCmsStorage(STORAGE_KEY, initialContactInformation),
  );
  const [savedSettings, setSavedSettings] = useState<ContactInformation>(() =>
    loadCmsStorage(STORAGE_KEY, initialContactInformation),
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: ContactInformationField, value: string) => {
    setSettings((previous) => ({ ...previous, [field]: value }));
    setIsSaved(false);
  };

  const handleSave = () => {
    const savedData = saveContactInformationMock(settings);
    const persisted = saveCmsStorage(STORAGE_KEY, savedData);
    if (!persisted) {
      toast.error("تعذر حفظ بيانات التواصل في التخزين المحلي");
      return;
    }
    setSettings(savedData);
    setSavedSettings(savedData);
    setIsSaved(true);
    toast.success("تم حفظ ونشر بيانات التواصل بنجاح");
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
