// Fungsi untuk navigasi dari halaman mulai ke halaman registrasi
document.addEventListener('DOMContentLoaded', function() {
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            window.location.href = 'registration.html';
        });
    }

    // Fungsi untuk mengirim ke WhatsApp dan menyimpan data saat form disubmit
    const registrationForm = document.getElementById('registrationForm');
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Mencegah reload halaman

            // Ambil nilai dari form
            const igLike = document.getElementById('igLike').value;
            const tiktokLike = document.getElementById('tiktokLike').value;
            const igViewers = document.getElementById('igViewers').value;
            const tiktokViewers = document.getElementById('tiktokViewers').value;
            const accountUrl = document.getElementById('accountUrl').value;

            // Validasi: Pastikan semua kolom diisi
            if (!igLike || !tiktokLike || !igViewers || !tiktokViewers || !accountUrl) {
                alert('Harap isi semua kolom URL!');
                return;
            }

            // Simpan data ke localStorage (untuk "terdata")
            const data = {
                igLike: igLike,
                tiktokLike: tiktokLike,
                igViewers: igViewers,
                tiktokViewers: tiktokViewers,
                accountUrl: accountUrl,
                timestamp: new Date().toISOString() // Tambahkan timestamp
            };

            // Ambil data lama dari localStorage (jika ada)
            let storedData = JSON.parse(localStorage.getItem('registrationData')) || [];
            storedData.push(data); // Tambahkan data baru
            localStorage.setItem('registrationData', JSON.stringify(storedData));

            // Buat pesan WhatsApp (opsional, tetap ada)
            const message = `Konfirmasi Registrasi Upgrade Sosial Media:%0A%0A- URL Instagram Like: ${igLike}%0A- URL TikTok Like: ${tiktokLike}%0A- URL Instagram Viewers: ${igViewers}%0A- URL TikTok Viewers: ${tiktokViewers}%0A- URL Akun: ${accountUrl}`;

            // Redirect ke halaman sukses setelah submit
            window.location.href = 'success.html';
        });
    }

    // Fungsi untuk halaman admin: Autentikasi dan tampilkan data
    if (window.location.pathname.includes('admin.html')) {
        // Prompt password untuk akses admin
        const password = prompt('Masukkan password admin:');
        if (password !== 'admin123') { // Ganti password ini sesuai kebutuhan
            alert('Akses ditolak! Password salah.');
            window.location.href = 'index.html'; // Redirect ke halaman mulai jika salah
            return;
        }

        // Jika password benar, tampilkan data
        const dataContainer = document.getElementById('dataContainer');
        const storedData = JSON.parse(localStorage.getItem('registrationData')) || [];

        if (storedData.length === 0) {
            dataContainer.innerHTML = '<p>Tidak ada data registrasi.</p>';
        } else {
            let tableHTML = `
                <table>
                    <thead>
                        <tr>
                            <th>Timestamp</th>
                            <th>IG Like URL</th>
                            <th>TikTok Like URL</th>
                            <th>IG Viewers URL</th>
                            <th>TikTok Viewers URL</th>
                            <th>Account URL</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            storedData.forEach(item => {
                tableHTML += `
                    <tr>
                        <td>${item.timestamp}</td>
                        <td>${item.igLike}</td>
                        <td>${item.tiktokLike}</td>
                        <td>${item.igViewers}</td>
                        <td>${item.tiktokViewers}</td>
                        <td>${item.accountUrl}</td>
                    </tr>
                `;
            });
            tableHTML += '</tbody></table>';
            dataContainer.innerHTML = tableHTML;
        }
    }
});