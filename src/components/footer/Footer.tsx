import '@/components/footer/Footer.css'

export default function Footer() {
    return (
        <footer className="footer ibm-plex-sans-thai-regular">
            <span>
                Copyright {new Date().getFullYear()} &copy; Thnawat Gulati
            </span>
            <span>
                <a
                    href="https://ga-dev-tools.google/campaign-url-builder/"
                    target="_blank"
                >
                    Google Campaign URL Builder
                </a>
            </span>
        </footer>
    )
}
