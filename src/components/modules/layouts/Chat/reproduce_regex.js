
const autoMessageRegex =
    /Halo, saya tertarik dengan layanan "([\s\S]+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Deskripsi: ([\s\S]*?)\) \(Gambar: (.+?)\)/;

const service = {
    name: "Service Name",
    id: "123",
    price: "Rp 100.000",
    description: "Short Description...",
    image: "https://example.com/image.jpg"
};

const autoMessage = `Halo, saya tertarik dengan layanan "${service.name}". (ServiceID: ${service.id}) (Harga: ${service.price}) (Deskripsi: ${service.description || ''}) (Gambar: ${service.image})`;

console.log("String:", autoMessage);
const match = autoMessageRegex.exec(autoMessage);
console.log("Match:", match ? "YES" : "NO");

if (!match) {
    console.log("Failed to match!");
} else {
    console.log("Captured:", match.slice(1));
}

// Test Case 2: Special Chars
const service2 = {
    name: "Service (Special)",
    id: "123-abc",
    price: "Rp 50.000",
    description: "Desc with ) parens",
    image: "http://img.com/a.jpg"
};
const msg2 = `Halo, saya tertarik dengan layanan "${service2.name}". (ServiceID: ${service2.id}) (Harga: ${service2.price}) (Deskripsi: ${service2.description || ''}) (Gambar: ${service2.image})`;
console.log("Msg2 Match:", autoMessageRegex.exec(msg2) ? "YES" : "NO");
