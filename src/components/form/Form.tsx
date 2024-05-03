import '@/components/form/Form.css'
import { CampaignForm } from '@/types/form'
import { useState } from 'react'
import QRCode from 'react-qr-code'

export default function Form() {
    const [downloading, setDownloading] = useState<boolean>(false)
    const [qr, setQr] = useState<string>('')
    const [form, setForm] = useState<CampaignForm>({
        url: '',
        campaignSource: '',
        campaignMedium: '',
        qrsize: 1200,
    })

    const submit = (gentype: string) => {
        // is valid url not empty and regex
        if (!form.url) {
            alert('กรุณากรอก URL')
            return
        }
        // is valid campaign source not empty
        if (!form.campaignSource) {
            alert('กรุณากรอก Campaign Source')
            return
        }
        // is valid campaign medium not empty
        if (!form.campaignMedium) {
            alert('กรุณากรอก Campaign Medium')
            return
        }

        if (
            !form.campaignId &&
            !form.campaignName &&
            !form.campaignTerm &&
            !form.campaignContent &&
            !form.qrsize
        ) {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน')
            return
        }

        const url = new URL(form.url)
        url.searchParams.append('utm_source', form.campaignSource)
        url.searchParams.append('utm_medium', form.campaignMedium)
        if (form.campaignId) {
            url.searchParams.append('utm_id', form.campaignId)
        }
        if (form.campaignName) {
            url.searchParams.append('utm_campaign', form.campaignName)
        }
        if (form.campaignTerm) {
            url.searchParams.append('utm_term', form.campaignTerm)
        }
        if (form.campaignContent) {
            url.searchParams.append('utm_content', form.campaignContent)
        }
        setQr(url.toString())

        // generate url
        if (gentype === 'url') {
            // copy to clipboard
            navigator.clipboard.writeText(url.toString())
            alert('คัดลอก URL สำเร็จ')
        }

        // generate qrcode and download
        if (gentype === 'qr') {
            setDownloading(true)
            // delay 1 sec for render qr code
            setTimeout(() => {
                const qrCode = document.querySelector('.qr-code')
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')
                const img = new Image()
                console.log(qrCode)
                img.src = `data:image/svg+xml;base64,${btoa(
                    qrCode?.outerHTML as string
                )}`
                img.onload = () => {
                    canvas.width = form.qrsize
                    canvas.height = form.qrsize
                    ctx?.drawImage(img, 0, 0, form.qrsize, form.qrsize)
                    const a = document.createElement('a')
                    a.download = `qrcode-${form.campaignSource}.png`
                    a.href = canvas.toDataURL('image/png')
                    a.click()
                }
                setQr('')
                setDownloading(false)
            }, 1000)
        }
    }

    return (
        <form className="form-generator ibm-plex-sans-thai-regular">
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="website-url">
                        Website URL <span className="required">*</span>
                    </span>

                    <input
                        type="url"
                        className="form-control"
                        placeholder="https://writer.dek-d.com"
                        aria-label="website"
                        aria-describedby="website-url"
                        onChange={(e) => {
                            setForm({ ...form, url: e.target.value })
                        }}
                        required
                    />
                </div>
                <small className="small-suggest">
                    The full website URL (e.g. https://www.example.com)
                </small>
            </div>
            {/* campaign Id */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-id">
                        Campaign ID
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="abc.123"
                        aria-label="campaign-id"
                        aria-describedby="campaign-id"
                        onChange={(e) => {
                            setForm({ ...form, campaignId: e.target.value })
                        }}
                    />
                </div>
                <small className="small-suggest">The ads campaign id.</small>
            </div>
            {/* campaign source */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-source">
                        Campaign Source <span className="required">*</span>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="google"
                        aria-label="campaign-source"
                        aria-describedby="campaign-source"
                        required
                        onChange={(e) => {
                            setForm({ ...form, campaignSource: e.target.value })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    The referrer (e.g. google, newsletter)
                </small>
            </div>
            {/* campaign medium */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-medium">
                        Campaign Medium <span className="required">*</span>
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="cpc"
                        aria-label="campaign-medium"
                        aria-describedby="campaign-medium-url"
                        required
                        onChange={(e) => {
                            setForm({ ...form, campaignMedium: e.target.value })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    Marketing medium (e.g. cpc, banner, email)
                </small>
            </div>
            {/* campaign name */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-name">
                        Campaign Name
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="spring_sale"
                        aria-label="campaign-name"
                        aria-describedby="campaign-name"
                        onChange={(e) => {
                            setForm({ ...form, campaignName: e.target.value })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    Product, promo code, or slogan (e.g. spring_sale)
                </small>
            </div>
            {/* campaign term */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-term">
                        Campaign Term
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="running+shoes"
                        aria-label="campaign-term"
                        aria-describedby="campaign-term"
                        onChange={(e) => {
                            setForm({ ...form, campaignTerm: e.target.value })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    Identify the paid keywords
                </small>
            </div>
            {/* campaign content */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="campaign-contente">
                        Campaign Content
                    </span>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="logolink"
                        aria-label="campaign-contente"
                        aria-describedby="campaign-contente"
                        onChange={(e) => {
                            setForm({
                                ...form,
                                campaignContent: e.target.value,
                            })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    Use to differentiate ads
                </small>
            </div>
            {/* qr size */}
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="qrsize">
                        Qrcode Size
                    </span>
                    <input
                        type="number"
                        defaultValue={1200}
                        className="form-control"
                        placeholder="1200"
                        aria-label="qrsize"
                        aria-describedby="qrsize"
                        onChange={(e) => {
                            setForm({ ...form, qrsize: Number(e.target.value) })
                        }}
                    />
                </div>
                <small className="small-suggest">
                    Qrcode size in pixel (e.g. 1200)
                </small>
            </div>
            <div className="btn-gp">
                {/* button */}
                <button
                    type="button"
                    className="btn btn-primary btn-ct"
                    onClick={() => submit('url')}
                >
                    <i className="bi bi-clipboard"></i> Generate URL
                </button>
                {/* button generate qrcode */}
                <button
                    type="button"
                    className="btn btn-secondary btn-ct"
                    onClick={() => submit('qr')}
                >
                    <div className={`clearfix${!downloading ? ' hide' : ''}`}>
                        <div
                            className="spinner-border spinner-border-sm mx-2"
                            role="status"
                        >
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        Generate QR
                    </div>
                    <span className={downloading ? 'hide' : ''}>
                        <i className="bi bi-download"></i> Generate QR
                    </span>
                </button>
            </div>
            <small className="small-download">
                *รอ 1 วินาทีสำหรับการโหลดไฟล์
            </small>
            <QRCode
                size={form.qrsize}
                style={{
                    height: 'auto',
                    maxWidth: '100%',
                    width: 'auto',
                }}
                value={qr}
                viewBox={`0 0 256 256`}
                className="qr-code"
            />
        </form>
    )
}
