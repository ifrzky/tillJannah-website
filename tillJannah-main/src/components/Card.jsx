import Button from "./Button";

const Data = [{
    "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUyNDEta2VzYWxhaGFuLWRhbGFtLW1lbWJhY2EtYWwtZmF0aWhhaC15YW5nLW1lbnllYmFia2FuLXNhbGF0LXRpZGFrLXNhaC5odG1s",
    "date": " 30 Mei 2024",
    "date_time": "Thu May 30 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
    "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Kesalahan-dalam-Membaca-Al-Fatihah-yang-Menyebabkan-Salat-Tidak-Sah-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
    "author": "Prasetyo Abu Ka'ab",
    "author_link": "https://muslim.or.id/author/prasetyo",
    "title": "Kesalahan dalam Membaca Al-Fatihah yang Menyebabkan Salat Tidak Sah",
    "url": "https://muslim.or.id/95241-kesalahan-dalam-membaca-al-fatihah-yang-menyebabkan-salat-tidak-sah.html",
    "type": "Muslim.or.id",
    "categories":[]
    },
        {
          "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUyMDktY2FyYS1ydWt1ay1kYW4tc3VqdWQtZGFsYW0tc2FsYXQtc2FtYmlsLWR1ZHVrLWF0YXUtYmVyYmFyaW5nLmh0bWw=",
          "date": " 29 Mei 2024",
          "date_time": "Wed May 29 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
          "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Cara-Rukuk-dan-Sujud-dalam-Salat-Sambil-Duduk-atau-Berbaring-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
          "author": "Prasetyo Abu Ka'ab",
          "author_link": "https://muslim.or.id/author/prasetyo",
          "title": "Cara Rukuk dan Sujud dalam Salat Sambil Duduk atau Berbaring",
          "url": "https://muslim.or.id/95209-cara-rukuk-dan-sujud-dalam-salat-sambil-duduk-atau-berbaring.html",
          "type": "Muslim.or.id",
          "categories": []
        },
        {
          "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUwNjktaGFkaXMtcGVyaW50YWgta2VwYWRhLXBhcmEtcGVtdWRhLXVudHVrLW1lbmlrYWgtYmFnLTIuaHRtbA==",
          "date": " 28 Mei 2024",
          "date_time": "Tue May 28 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
          "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Perintah-kepada-Para-Pemuda-untuk-Menikah-2-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
          "author": "M. Saifudin Hakim",
          "author_link": "https://muslim.or.id/author/saifudinhakim",
          "title": "Hadis: Perintah kepada Para Pemuda untuk Menikah (Bag. 2)",
          "url": "https://muslim.or.id/95069-hadis-perintah-kepada-para-pemuda-untuk-menikah-bag-2.html",
          "type": "Muslim.or.id",
          "categories": []
        },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUxMTUta2V0aWthLWNpbnRhLXRlcm5vZGFpLmh0bWw=",
        //   "date": " 27 Mei 2024",
        //   "date_time": "Mon May 27 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Ketika-Cinta-Ternodai-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "Arif Muhammad Nurwijaya, S.Pd",
        //   "author_link": "https://muslim.or.id/author/arifmn",
        //   "title": "Ketika Cinta Ternodai",
        //   "url": "https://muslim.or.id/95115-ketika-cinta-ternodai.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUwOTgtYWtpYmF0LWJlcnRpa2FpLWRpLWR1bmlhLWRhbi1ha2hpcmF0Lmh0bWw=",
        //   "date": " 26 Mei 2024",
        //   "date_time": "Sun May 26 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Akibat-Bertikai-di-Dunia-dan-Akhirat-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "Arif Muhammad Nurwijaya, S.Pd",
        //   "author_link": "https://muslim.or.id/author/arifmn",
        //   "title": "Akibat Bertikai di Dunia dan Akhirat",
        //   "url": "https://muslim.or.id/95098-akibat-bertikai-di-dunia-dan-akhirat.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTQ5ODAtaGFkaXMtcGVyaW50YWgta2VwYWRhLXBhcmEtcGVtdWRhLXVudHVrLW1lbmlrYWgtYmFnLTEuaHRtbA==",
        //   "date": " 28 Mei 2024",
        //   "date_time": "Tue May 28 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Perintah-kepada-Para-Pemuda-untuk-Menikah-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "M. Saifudin Hakim",
        //   "author_link": "https://muslim.or.id/author/saifudinhakim",
        //   "title": "Hadis: Perintah kepada Para Pemuda untuk Menikah (Bag. 1)",
        //   "url": "https://muslim.or.id/94980-hadis-perintah-kepada-para-pemuda-untuk-menikah-bag-1.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUxMzkta2FpZGFoLWZpa2loLWh1a3VtLXdhc2lsYWgtc2FyYW5hLXRlcmdhbnR1bmctcGFkYS10dWp1YW4tdHVqdWFubnlhLmh0bWw=",
        //   "date": " 24 Mei 2024",
        //   "date_time": "Fri May 24 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Hukum-Wasilah-Sarana-Tergantung-pada-Tujuan-Tujuannya-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "Muhammad Zia Abdurrofi",
        //   "author_link": "https://muslim.or.id/author/ziaabdurrofi",
        //   "title": "Kaidah Fikih: Hukum Wasilah (Sarana) Tergantung pada Tujuan-Tujuannya",
        //   "url": "https://muslim.or.id/95139-kaidah-fikih-hukum-wasilah-sarana-tergantung-pada-tujuan-tujuannya.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUxNzUtbWVtcGVyYmFpa2ktaGF0aS1kYW4tbWVuZ29rb2hrYW4taW1hbi1kZW5nYW4tYWwtcXVyYW4uaHRtbA==",
        //   "date": " 24 Mei 2024",
        //   "date_time": "Fri May 24 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Memperbaiki-Hati-dan-Mengokohkan-Iman-dengan-Al-Quran-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "M. Saifudin Hakim",
        //   "author_link": "https://muslim.or.id/author/saifudinhakim",
        //   "title": "Memperbaiki Hati dan Mengokohkan Iman dengan Al-Quran",
        //   "url": "https://muslim.or.id/95175-memperbaiki-hati-dan-mengokohkan-iman-dengan-al-quran.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTUxMDAtbWFrbmEta2VtZXJkZWthYW4tYmFnaS1zZW9yYW5nLW11c2xpbS5odG1s",
        //   "date": " 23 Mei 2024",
        //   "date_time": "Thu May 23 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Makna-Kemerdekaan-bagi-Seorang-Muslim-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "Muhammad Idris, Lc.",
        //   "author_link": "https://muslim.or.id/author/idrissaelany",
        //   "title": "Makna Kemerdekaan bagi Seorang Muslim",
        //   "url": "https://muslim.or.id/95100-makna-kemerdekaan-bagi-seorang-muslim.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvOTQ5MDctaGFkaXMtbWVuaWthaC1hZGFsYWgtc3VuYWgtbmFiaS5odG1s",
        //   "date": " 22 Mei 2024",
        //   "date_time": "Wed May 22 2024 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2024/05/Menikah-adalah-Sunah-Nabi-350x250.webp?strip=all&lossy=1&ssl=1&fit=350%2C250",
        //   "author": "M. Saifudin Hakim",
        //   "author_link": "https://muslim.or.id/author/saifudinhakim",
        //   "title": "Hadis: Menikah adalah Sunah Nabi",
        //   "url": "https://muslim.or.id/94907-hadis-menikah-adalah-sunah-nabi.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvNDEzNi1zZXJpbmctdGVydWNhcC1sdXB1dC1kYXJpLXJlbnVuZ2FuLmh0bWw=",
        //   "date": " 21 April 2021",
        //   "date_time": "Wed Apr 21 2021 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2010/07/Sering-Terucap-Luput-Dari-Renungan.jpg?strip=all&lossy=1&resize=120%2C86&ssl=1",
        //   "author": "",
        //   "title": "Sering Terucap, Luput Dari Renungan",
        //   "url": "https://muslim.or.id/4136-sering-terucap-luput-dari-renungan.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvNDMxNjMtYXFpZGFoLWFsLXdhbGEtd2FsLWJhcmEtYXFpZGFoLWFzaW5nLXlhbmctZGlhbmdnYXAtdXNhbmctYmFnLTEuaHRtbA==",
        //   "date": " 25 Oktober 2018",
        //   "date_time": "Thu Oct 25 2018 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2018/10/Aqidah-Al-Wala’-wal-Bara’-bagian-1.jpg?strip=all&lossy=1&resize=120%2C86&ssl=1",
        //   "author": "",
        //   "title": "Aqidah Al-Wala’ wal Bara’, Aqidah Asing yang Dianggap Usang (Bag. 1)",
        //   "url": "https://muslim.or.id/43163-aqidah-al-wala-wal-bara-aqidah-asing-yang-dianggap-usang-bag-1.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvMTg1MDQta2FpZGFoLWthaWRhaC1wZW50aW5nLWRhbGFtLWl0dGliYS0xLmh0bWw=",
        //   "date": " 29 April 2021",
        //   "date_time": "Thu Apr 29 2021 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2010/05/menghidupkan-sunnah.jpg?strip=all&lossy=1&resize=120%2C86&ssl=1",
        //   "author": "",
        //   "title": "Kaidah-Kaidah Penting Dalam Ittiba’ (1)",
        //   "url": "https://muslim.or.id/18504-kaidah-kaidah-penting-dalam-ittiba-1.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvMTM0NTctc2VyaWFsLTYtYWxhbS1qaW4tcGVya2F3aW5hbi1qaW4uaHRtbA==",
        //   "date": " 26 September 2023",
        //   "date_time": "Tue Sep 26 2023 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "author": "",
        //   "title": "Serial 6 Alam Jin: Perkawinan Jin",
        //   "url": "https://muslim.or.id/13457-serial-6-alam-jin-perkawinan-jin.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
        // {
        //   "id": "aHR0cHM6Ly9tdXNsaW0ub3IuaWQvNjA1NzUtdGV0YXAtYmVyc2FuZGFyLWtlcGFkYS1hbGxhaC1zZXRlbGFoLWRpdmFrc2luYXNpLmh0bWw=",
        //   "date": " 31 Januari 2021",
        //   "date_time": "Sun Jan 31 2021 00:00:00 GMT+0000 (Coordinated Universal Time)",
        //   "thumbnail": "https://cdnm.muslim.or.id/wp-content/uploads/2021/01/20210120-Tetap-Bersandar-Kepada-Allah-Setelah-Divaksinasi.png?strip=all&lossy=1&resize=120%2C86&ssl=1",
        //   "author": "",
        //   "title": "Tetap Bersandar kepada Allah setelah Divaksinasi",
        //   "url": "https://muslim.or.id/60575-tetap-bersandar-kepada-allah-setelah-divaksinasi.html",
        //   "type": "Muslim.or.id",
        //   "categories": []
        // },
]

const Cards = () => {
    return (
        <div className="__wrapper items-center">
            <div className="__card grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center space-between">
                {Data.map((article) => (
                    <div key={article.id} className="__card_item">
                        <div className="__card_item_thumbnail">
                            <img src={article.thumbnail} alt="thumbnail" className="w-full rounded-t-md h-min-56 object-cover"/>
                        </div>
                        <div className="__card_item_content h-xl shadow-md rounded-b-md px-10 py-10">
                            <h2 className="__card_item_title font-bold mb-10">{article.title}</h2>
                            <p className="__card_item_author"><a href={article.author_link}>{article.author}</a></p>
                            <p className="__card_item_date">{article.date}</p>
                            <Button to={article.url}>Read More</Button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="__view_more flex mx10 my-10 justify-center items-center">
                <Button>View More</Button>
            </div>
        </div>
    )
} 

export default Cards;