
const autoMessageRegex =
    /Halo, saya tertarik dengan layanan "([\s\S]+?)"\. \(ServiceID: ([^\)]+)\) \(Harga: Rp ([^\)]+)\) \(Deskripsi: ([\s\S]*?)\) \(Gambar: (.+?)\)/;

// Test Case 3: Quotes in Name
const service3 = {
    name: 'Service "With Quotes"',
    id: "123",
    price: "Rp 100.000",
    description: "Desc",
    image: "img.jpg"
};
const msg3 = `Halo, saya tertarik dengan layanan "${service3.name}". (ServiceID: ${service3.id}) (Harga: ${service3.price}) (Deskripsi: ${service3.description || ''}) (Gambar: ${service3.image})`;
console.log("Msg3:", msg3);
console.log("Msg3 Match:", autoMessageRegex.exec(msg3) ? "YES" : "NO");

// Test Case 4: Zero width space or something weird?
// Unlikely.

// Test Case 5: Missing Description (Description empty string)
const service4 = {
    name: 'Service Normal',
    id: "123",
    price: "Rp 100.000",
    description: "",
    image: "img.jpg"
};
const msg4 = `Halo, saya tertarik dengan layanan "${service4.name}". (ServiceID: ${service4.id}) (Harga: ${service4.price}) (Deskripsi: ${service4.description || ''}) (Gambar: ${service4.image})`;
console.log("Msg4:", msg4);
console.log("Msg4 Match:", autoMessageRegex.exec(msg4) ? "YES" : "NO");
