export const formatTime = (timeString: string): string => {
    if (!timeString) return "";
    // Convert HH:MM:SS to HH:MM AM/PM
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };