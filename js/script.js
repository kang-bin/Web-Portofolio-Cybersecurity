/**
 * Portofolio Vino Rifhendi - JavaScript
 * Bahasa Indonesia
 */

// Tunggu DOM selesai dimuat
document.addEventListener('DOMContentLoaded', function() {
    inisialisasiAplikasi();
});

function inisialisasiAplikasi() {
    inisialisasiNavigasi();
    inisialisasiScroll();
    inisialisasiFormKontak();
    inisialisasiKembaliKeAtas();
    inisialisasiTahunSekarang();
    inisialisasiAnimasi();
}

/**
 * Navigasi Mobile
 */
function inisialisasiNavigasi() {
    const tombolMenu = document.getElementById('menu-toggle');
    const menuMobile = document.getElementById('mobile-menu');
    
    if (tombolMenu && menuMobile) {
        tombolMenu.addEventListener('click', function() {
            const terbuka = menuMobile.classList.contains('hidden');
            
            // Toggle menu
            menuMobile.classList.toggle('hidden');
            
            // Ubah ikon tombol
            tombolMenu.innerHTML = terbuka 
                ? '<i class="fas fa-times text-lg"></i>'
                : '<i class="fas fa-bars text-lg"></i>';
            
            // Cegah scroll body saat menu terbuka
            document.body.style.overflow = terbuka ? 'hidden' : '';
        });
        
        // Tutup menu saat klik di luar
        document.addEventListener('click', function(event) {
            if (!menuMobile.contains(event.target) && 
                !tombolMenu.contains(event.target) && 
                !menuMobile.classList.contains('hidden')) {
                menuMobile.classList.add('hidden');
                tombolMenu.innerHTML = '<i class="fas fa-bars text-lg"></i>';
                document.body.style.overflow = '';
            }
        });
    }
    
    // Efek scroll navbar
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update link aktif
        updateLinkAktif();
    });
    
    function updateLinkAktif() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('nav a[href^="#"]');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        links.forEach(link => {
            link.classList.remove('text-biru');
            link.classList.add('text-gray-600');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-600');
                link.classList.add('text-biru');
            }
        });
    }
}

/**
 * Smooth Scroll
 */
function inisialisasiScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (!target) return;
            
            e.preventDefault();
            
            // Tutup menu mobile jika terbuka
            const menuMobile = document.getElementById('mobile-menu');
            const tombolMenu = document.getElementById('menu-toggle');
            if (menuMobile && !menuMobile.classList.contains('hidden')) {
                menuMobile.classList.add('hidden');
                tombolMenu.innerHTML = '<i class="fas fa-bars text-lg"></i>';
                document.body.style.overflow = '';
            }
            
            // Smooth scroll ke target
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        });
    });
}

/**
 * Form Kontak
 */
function inisialisasiFormKontak() {
    const form = document.getElementById('form-kontak');
    const pesanForm = document.getElementById('pesan-form');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Ambil data form
        const dataForm = {
            nama: document.getElementById('nama').value.trim(),
            email: document.getElementById('email').value.trim(),
            subjek: document.getElementById('subjek').value,
            pesan: document.getElementById('pesan').value.trim()
        };
        
        // Validasi
        if (!dataForm.nama || !dataForm.email || !dataForm.pesan) {
            tampilkanPesan('Harap isi semua field yang wajib diisi.', 'error');
            return;
        }
        
        if (!validasiEmail(dataForm.email)) {
            tampilkanPesan('Harap masukkan alamat email yang valid.', 'error');
            return;
        }
        
        // Tampilkan loading
        const tombolKirim = form.querySelector('button[type="submit"]');
        const teksAsli = tombolKirim.innerHTML;
        tombolKirim.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Mengirim...';
        tombolKirim.disabled = true;
        
        try {
            // Simulasi pengiriman (di production, ganti dengan fetch ke backend)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Tampilkan pesan sukses
            tampilkanPesan(
                `Terima kasih, ${dataForm.nama}! Pesan Anda telah terkirim. Saya akan membalas segera.`,
                'success'
            );
            
            // Reset form
            form.reset();
            
            // Sembunyikan pesan setelah 5 detik
            setTimeout(() => {
                pesanForm.classList.add('hidden');
            }, 5000);
            
        } catch (error) {
            tampilkanPesan('Terjadi kesalahan. Silakan coba lagi.', 'error');
        } finally {
            // Kembalikan tombol ke keadaan semula
            tombolKirim.innerHTML = teksAsli;
            tombolKirim.disabled = false;
        }
    });
    
    function tampilkanPesan(teks, tipe) {
        if (!pesanForm) return;
        
        pesanForm.textContent = teks;
        pesanForm.className = 'p-4 rounded-lg text-sm';
        
        if (tipe === 'success') {
            pesanForm.classList.add('bg-green-50', 'text-green-700', 'border', 'border-green-200');
        } else if (tipe === 'error') {
            pesanForm.classList.add('bg-red-50', 'text-red-700', 'border', 'border-red-200');
        }
        
        pesanForm.classList.remove('hidden');
        
        // Scroll ke pesan
        pesanForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    
    function validasiEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
}

/**
 * Tombol Kembali ke Atas
 */
function inisialisasiKembaliKeAtas() {
    const tombol = document.getElementById('kembali-ke-atas');
    
    if (!tombol) return;
    
    // Tampilkan/sembunyikan tombol
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            tombol.classList.remove('opacity-0', 'invisible');
            tombol.classList.add('opacity-100', 'visible');
        } else {
            tombol.classList.remove('opacity-100', 'visible');
            tombol.classList.add('opacity-0', 'invisible');
        }
    });
    
    // Scroll ke atas
    tombol.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Tahun Sekarang di Footer
 */
function inisialisasiTahunSekarang() {
    const elemenTahun = document.getElementById('tahun-sekarang');
    if (elemenTahun) {
        elemenTahun.textContent = new Date().getFullYear();
    }
}

/**
 * Animasi
 */
function inisialisasiAnimasi() {
    // Observer untuk animasi fade-in
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Amati elemen-elemen
    document.querySelectorAll('.card, .tool-icon, .timeline-item').forEach(el => {
        observer.observe(el);
    });
    
    // Efek hover pada kartu
    const kartu = document.querySelectorAll('.bg-white, .bg-gray-50');
    kartu.forEach(kartu => {
        kartu.addEventListener('mouseenter', () => {
            kartu.style.transform = 'translateY(-4px)';
            kartu.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
        
        kartu.addEventListener('mouseleave', () => {
            kartu.style.transform = 'translateY(0)';
            kartu.style.boxShadow = '';
        });
    });
}

/**
 * Optimasi Performance
 */

// Debounce untuk event scroll
function debounce(func, wait = 100) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle untuk event resize
function throttle(func, limit = 200) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Tambahkan loading="lazy" ke gambar
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// Cegah klik kanan pada gambar
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
});