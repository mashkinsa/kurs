import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './registration.css'

export default function Registration(){
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [hasErrorPassword, setHasErrorPassword] = useState(false)
    const [hasErrorRepeatPassword, setHasErrorRepeatPassword] = useState(false)
    const [hasErrorEmail,setHasErrorEmail] = useState(false)
    const [hasErrorPhoneNumber,setHasErrorPhoneNumber] = useState(false)
    const navigate = useNavigate()


    function handleSubmit(e){
        e.preventDefault()
        navigate('/')
        alert('Регистрация успешно пройдена')
    }

    function setValue(e,nameElement){
        switch(nameElement){
            case 'password':{
                if(e.target.value===''){
                    setHasErrorPassword(true)
                }
                else{
                    if(e.target.value===repeatPassword){
                        setHasErrorRepeatPassword(false)
                    }
                    setHasErrorPassword(false)    
                }
                setPassword(e.target.value)
                break
            }
            case 'repeatPassword':{
                setRepeatPassword(e.target.value)
                if(e.target.value===password && e.target.value!==''){
                    setHasErrorRepeatPassword(false)
                }
                else{
                    setHasErrorRepeatPassword(true)
                }
                break
            }
            case 'email':{
                if(e.target.value===''){
                    setHasErrorEmail(true)
                }
                else{
                    setHasErrorEmail(false)   
                }
                setEmail(e.target.value)
                break
            }
            case ('phoneNumber'):{
                if(e.target.value===''){
                    setHasErrorPhoneNumber(true)
                }
                else{
                    setHasErrorPhoneNumber(false) 
                }
                setPhoneNumber(e.target.value)
                break
            }
            default:{}
        }
    }

    return(
        <section className="registration-container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='email'>Email:</label>
                    <input 
                        id='email'
                        type='email'
                        value={email}
                        onChange={(e)=>setValue(e,'email')}
                        style={{
                            border: hasErrorEmail ? '1px solid red':null
                        }}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Пароль:</label>
                    <input 
                        id='password'
                        type='password'
                        value={password}
                        minLength={8}
                        onChange={(e)=>setValue(e,'password')}
                        style={{
                            border: hasErrorPassword ? '1px solid red':null
                        }}
                        required
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='repeatPassword'>Повторите пароль:</label>
                    <input 
                        id='repeatPassword'
                        type='password'
                        value={repeatPassword}
                        minlength={8}
                        onChange={(e)=>setValue(e,'repeatPassword')}
                        style={{
                            border: hasErrorRepeatPassword ? '1px solid red':null
                        }}
                        required
                    />
                </div>
                {hasErrorRepeatPassword && <span className='span-message'>Пароли не совпадают</span>}

                <div className='form-group'>
                    <label htmlFor='phoneNumber'>Телефон:</label>
                    <input 
                        id='phoneNumber'
                        type='text'
                        pattern="[0-9+]{11}"
                        maxlength={11}
                        value={phoneNumber}
                        onChange={(e)=>setValue(e,'phoneNumber')}
                        style={{
                            border: hasErrorPhoneNumber ? '1px solid red':null
                        }}
                        required
                    />
                </div>
                <button type="submit" className='registration-button'>
                    Зарегистрироваться
                </button>
                <p className='link'><Link to={"/login"} className='link'>Уже есть аккаунт</Link></p>
            </form>
        </section>
    );
}