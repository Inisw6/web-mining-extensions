chrome.runtime.onInstalled.addListener(async () => {
    const { userId } = await chrome.storage.sync.get("userId");
    if (!userId) {
      const newId = crypto.randomUUID();
      await chrome.storage.sync.set({ userId: newId });
      console.log("Generated new userId:", newId);
    }
  });