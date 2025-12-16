export const formatTime = (timestamp) => {
    if (!timestamp) return "";

    const date = new Date(timestamp);
    const now = new Date();

    const timeOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    };

    const isToday =
        date.getDate() === now.getDate() &&
        date.getMonth() === now.getMonth() &&
        date.getFullYear() === now.getFullYear();

    if (isToday) {
        return date.toLocaleTimeString("id-ID", timeOptions);
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
        return "Kemarin";
    }

    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    if (date > sevenDaysAgo) {
        const dayOptions = { weekday: "long" };
        return new Intl.DateTimeFormat("id-ID", dayOptions).format(date);
    }

    const dateOptions = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    };
    return date.toLocaleDateString("id-ID", dateOptions);
};

// REGEX PATTERNS
export const autoMessageRegex =
    /Halo, saya tertarik dengan layanan "([\s\S]+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Deskripsi: ([\s\S]*?)\) \(Gambar: (.+?)\)/;

export const negoMessageRegex =
    /Halo, saya tertarik dengan layanan "([\s\S]+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Nego: Rp ([^\)]+)\) \(Pesan: ([\s\S]*?)\) \(Deskripsi: ([\s\S]*?)\) \(Gambar: (.+?)\)(?: \(Rating: ([^\)]+)\))?/;

export const acceptNegoRegex =
    /Penawaran Anda sebesar Rp (.+?) untuk layanan "(.+?)" DITERIMA! 🎉/;
