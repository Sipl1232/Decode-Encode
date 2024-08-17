import { useEffect, useRef, useState } from 'react';
import { AlertBox } from '../CommonComponents/InputBox';
import { post } from '../CommonComponents/CustomHooks';
import { useNavigate } from "react-router-dom";
import BlurLoader from '../CommonComponents/BlurLoader';
import { toast } from 'react-hot-toast';
const HexToBase64 = () => {
    const navigate = useNavigate();
    const textareaRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [responseValue, setResponseValue] = useState('');
    const [formData, setFormData] = useState({
        initialValue: '',
        outputFormat: '',
    });
    const handleClear = () => {
        setFormData({
            initialValue: '',
            outputFormat: '',
        })
        setResponseValue('')
    }
    const handleSubmit = () => {
        const base64String = formData.initialValue;
        if (!base64String) {
            AlertBox('ERROR', 'Enter Hex value !', 'txtValue1');
            return;
        }
        const data = {
            ...formData,
        }
        setIsLoading(true)
        post('/hex_to_base64', { ...data }, (res) => {
            if (res.status === 'success') {
                setResponseValue(res.responseValue)
                AlertBox(res.status, res.message, res.focus);
                setIsLoading(false);
            }
            else if (res.status === 'error') {
                AlertBox(res.status, res.message, '');
                setIsLoading(false)
            }
        })
    }


    const copyToClipboard = () => {
        const textarea = textareaRef.current;
        textarea.select();
        document.execCommand('copy');
        responseValue !== '' && toast.success('Text copied to clipboard!');
    };

    useEffect(() => {
        document.title = 'Hex To Base64'
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <>
            <div className='main-card card  border-0'>
                <div className='pt-1 row px-3 border-0'>
                    <div className='card-header '>
                        <h6 >{'Hex To Base64'} </h6>
                    </div>

                    <div className='card-body mt-3 pb-1'>
                        <p style={{ fontSize: '11px' }}>The<span>"</span>Hex to Base64<span>"</span> converter is a smart tool which is able to convert online Hex values to Base64 strings. I call him <span>"</span>smart<span>"</span>because it accepts several written representations of hexadecimal values. The conversion process is quite simple: the converter decodes the Hex value into the original data, then encodes it to Base64 and gives you the final result almost instantly. If you are looking for the reverse process, check Base64 to Hex.</p>
                        <div className='row'>
                            <div className="fields  ">
                                <label className="form-label">Hex To Base64</label>
                                <textarea
                                    id='txtValue1'
                                    rows="3"
                                    type="text"
                                    className="form-control"
                                    placeholder='Type (or Paste) here...'
                                    value={formData.initialValue}
                                    onChange={(e) => {
                                        setFormData({ ...formData, initialValue: e.target.value })
                                    }}
                                />
                            </div>
                            
                            <div className='d-flex align-items-center gap-1 mb-1' style={{ fontSize: '13px' }}>
                                <button type="button"
                                    onClick={handleSubmit}
                                    className="btn btn-rounded btn-secondary">Encode Hex to Base64</button>
                            </div>
                            <p style={{ fontSize: '12px', marginTop: "8px" }}>The result of Base64 encoding will appear below</p>
                            <div className="fields">
                                <label>Base64</label>
                                <textarea
                                    id='txtValue2'
                                    rows="10"
                                    type="text"
                                    className="form-control"
                                    placeholder='Result Goes here...'
                                    value={responseValue}
                                    ref={textareaRef}
                                />
                            </div>
                            <div className='card-body'>
                                <button type="button"
                                    onClick={copyToClipboard}
                                    className="btn btn-rounded btn-secondary">
                                    <span className=" text-white me-2">
                                        <i className="fas fa-copy"></i>
                                    </span>Copy
                                </button>

                                <button type="button" onClick={() => handleClear()} className="btn btn-rounded btn-danger"><span className="text-white me-2">
                                    <i className="fa-solid fa-arrow-rotate-left"></i>
                                </span>Clear</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className='main-card card  border-0'>
                <div className='card-body mt-3 pb-1'>

                    <div style={{ fontSize: '15px', fontWeight: "600" }}>
                        <i className="fas fa-question-circle me-1"> </i>
                        How to convert Hex to Base64
                    </div>

                    <div style={{ width: "100%", height: "1px", borderBottom: "1px dashed black", marginTop: "5px" }}></div>

                    <ul>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Type or paste your hexadecimal value into the <span>"</span>Hex<span>"</span> field. </li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Press the<span>"</span> Convert Hex to Base64<span>"</span> button.</li>
                        <li style={{ fontSize: '12px', marginTop: "8px" }}>Download or copy the result from the<span>"</span>Base64<span>"</span>field.</li>
                    </ul>

                    <div style={{ fontSize: '13px', marginTop: "12px", marginBottom: '12px' }}><i className="fas fa-copyright me-1"></i> @2024<a href=' www.sagarinfotech.com'> www.sagarinfotech.com</a></div>
                    <div className='card-body'>
                        <button type="button"
                            onClick={() => {
                                navigate('/PrivacyPolicy')
                            }}
                            className=" btn-rounded btn btn-info">
                            <span className=" text-white me-2">
                                <i className="fas fa-lock"></i>
                            </span>Privacy policy</button>
                        <button type="button" onClick={() => {

                        }} className=" btn-rounded btn btn-info"><span className="text-white me-2">
                                <i className="fas fa-at"></i>
                            </span>Contact us
                        </button>
                    </div>
                    <p style={{ fontSize: '12px', marginTop: "8px" }}>This website uses cookies. We use cookies to personalise content/ads and to analyse our traffic.</p>
                </div>
            </div>
            {isLoading && <BlurLoader />}
        </>
    )
}
export default HexToBase64;
