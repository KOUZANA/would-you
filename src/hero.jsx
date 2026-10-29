import { useState } from 'react'

const dodgePositions = [
    { x: '72px', y: '-58px' },
    { x: '-68px', y: '62px' },
    { x: '58px', y: '54px' },
    { x: '-76px', y: '-52px' },
]

function Hero() {
    const [dodgeCount, setDodgeCount] = useState(-1)
    const [showConfirmation, setShowConfirmation] = useState(false)
    const [showQuestionForm, setShowQuestionForm] = useState(false)
    const [answer, setAnswer] = useState('')
    const [emailMessage, setEmailMessage] = useState('')
    const [emailDraftOpened, setEmailDraftOpened] = useState(false)
    const dodgePosition = dodgePositions[dodgeCount]
    const recipientEmail = import.meta.env.VITE_RECIPIENT_EMAIL?.trim()

    function handleAnswerSubmit(event) {
        event.preventDefault()

        if (!recipientEmail) {
            setEmailMessage('This form is not configured to send yet. Please try again later.')
            return
        }

        const subject = encodeURIComponent('My answer to your question')
        const body = encodeURIComponent(`The thing I like most about you is:\n\n${answer}`)
        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`
        setEmailDraftOpened(true)
        setEmailMessage('Your email app should open with your answer ready. Press Send to deliver it.')
    }

    return (
        <main className="invitation-page">
            <header className="page-header">
                <span className="wordmark"><span className="wordmark-heart">♥</span> a little love note</span>
                <span className="header-tag">MADE JUST FOR YOU</span>
            </header>

            <div className="invitation-layout">
                <span className="orbit-note orbit-note--left">✦&nbsp; you + me</span>
                <section className="hero" aria-labelledby="invitation-title">
                    <div className="hero-art" aria-hidden="true">
                        <span className="hero-art-heart">♥</span>
                        <span className="hero-art-spark hero-art-spark--one">✦</span>
                        <span className="hero-art-spark hero-art-spark--two">✧</span>
                    </div>
                    {emailDraftOpened ? (
                        <div className="confirmation-content">
                            <p className="eyebrow">THANK YOU, SWEETHEART</p>
                            <h1 id="invitation-title">That made me <em>smile!</em></h1>
                            <p className="hero-copy" role="status">{emailMessage}</p>
                        </div>
                    ) : showQuestionForm ? (
                        <div className="confirmation-content">
                            <p className="eyebrow">ONE LAST LITTLE QUESTION</p>
                            <h1 id="invitation-title">What do you like <em>most?</em></h1>
                            <p className="hero-copy">What’s the thing you like most about me?</p>
                            <form className="answer-form" onSubmit={handleAnswerSubmit}>
                                <label htmlFor="favorite-thing">Your answer</label>
                                <textarea
                                    id="favorite-thing"
                                    name="favoriteThing"
                                    maxLength={1000}
                                    required
                                    rows={4}
                                    value={answer}
                                    onChange={(event) => setAnswer(event.target.value)}
                                />
                                <button className="hero-button hero-button--yes" type="submit">
                                    Send my answer <span aria-hidden="true">♥</span>
                                </button>
                                <p className="form-message" role="status">{emailMessage}</p>
                            </form>
                        </div>
                    ) : showConfirmation ? (
                        <div className="confirmation-content">
                            <p className="eyebrow">JUST MAKING SURE</p>
                            <h1 id="invitation-title">Are you <em>sure?</em></h1>
                            <p className="hero-copy">A yes means a lovely date with me, Younes.<br />Still want to say yes?</p>
                            <div className="hero-buttons">
                                <button
                                    className="hero-button hero-button--yes"
                                    onClick={() => setShowQuestionForm(true)}
                                >
                                    Yes, I’m sure <span aria-hidden="true">♥</span>
                                </button>
                                <button
                                    className="hero-button hero-button--maybe"
                                    onPointerEnter={(event) => {
                                        if (event.pointerType !== 'mouse') return

                                        setDodgeCount((count) => (count + 1) % dodgePositions.length)
                                    }}
                                    onClick={() => {
                                        setDodgeCount((count) => (count + 1) % dodgePositions.length)
                                    }}
                                    style={{
                                        '--dodge-x': dodgeCount < 0 ? '0' : dodgePosition.x,
                                        '--dodge-y': dodgeCount < 0 ? '0' : dodgePosition.y,
                                    }}
                                >
                                    No, I changed my mind <span aria-hidden="true">✕</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <p className="eyebrow">I HAVE A VERY IMPORTANT QUESTION</p>
                            <h1 id="invitation-title">
                                Will you start
                                <span className="title-second-line">dating <em>Younes?</em></span>
                            </h1>
                            <p className="hero-copy">I can think of a million lovely things to do.<br />The best part would be doing them with you.</p>
                            <div className="hero-buttons">
                                <button
                                    className="hero-button hero-button--yes"
                                    onClick={() => setShowConfirmation(true)}
                                >
                                    Yes, absolutely <span aria-hidden="true">♥</span>
                                </button>
                                <button
                                    className="hero-button hero-button--maybe"
                                    onPointerEnter={(event) => {
                                        if (event.pointerType !== 'mouse') return

                                        setDodgeCount((count) => (count + 1) % dodgePositions.length)
                                    }}
                                    onClick={() => {
                                        setDodgeCount((count) => (count + 1) % dodgePositions.length)
                                    }}
                                    style={{
                                        '--dodge-x': dodgeCount < 0 ? '0' : dodgePosition.x,
                                        '--dodge-y': dodgeCount < 0 ? '0' : dodgePosition.y,
                                    }}
                                >
                                    Sorry, but no <span aria-hidden="true">✕</span>
                                </button>
                            </div>
                            <p className="tiny-note">P.S. there are no wrong answers (but I’m hoping for one) <span aria-hidden="true">♡</span></p>
                        </>
                    )}
                </section>
                <span className="orbit-note orbit-note--right">A DATE?&nbsp; ✿</span>
            </div>

            <footer className="page-footer">
                <span>THE BEGINNING OF SOMETHING SERIOUS</span> 
                <span className="footer-doodle" aria-hidden="true">♥ &nbsp; ♥ &nbsp; ♥</span>
                <span>WITH LOVE, ALWAYS</span>
            </footer>
        </main>
    );
}

export default Hero