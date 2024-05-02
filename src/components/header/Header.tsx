import Icon from '@/assets/icon.svg'
import '@/components/header/Header.css'

export const Header = () => {
    return (
        <header className="qr-icon">
            <img src={Icon} alt="logo" className="image-icon" />
            <div className="header-title">
                <h1 className="header ibm-plex-sans-thai-bold">
                    UTM & QR Generator
                </h1>
                <h6 className="ibm-plex-sans-thai-medium">(GA4)</h6>
            </div>
        </header>
    )
}
