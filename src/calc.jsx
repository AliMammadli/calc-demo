import React, { useState } from 'react'
import MathJax from 'react-mathjax'


export const Calc = () => {
    const [nu, set_nu] = useState(1)
    const [kappa, set_kappa] = useState(1)
    const [lambda, set_lambda] = useState(3)
    const [s, set_s] = useState(8)
    const [S, set_S] = useState(10)


    const onChange = (e, setState) => {
        setState(+e.target.value)
    }


    const d = (nu + kappa) / lambda
    const b = kappa / lambda


    const a = (m) => {
        if (1 <= m && m <= s + 1) { return (1 + d) ** (m - 1) }
        else if (s + 1 < m && m <= S) { return (1 + d) ** (s) * (1 + b) ** (m - s - 1) }
    }

    const c = () => {
        let sum = 0
        for (let i = 1; i <= S; i++) {
            sum += a(i)
        }
        return sum
    }

    const p = (m) => {
        if (m === 0) { return (1 + b * c()) / (1 + d * c()) }
        else if (m === 1) { return p(0) * d - b }
        else if (2 <= m && m <= s) { return p(1) * (1 + d) ** (m - 1) }
        else if (s + 1 <= m && m <= S - s) { return p(1) * ((1 + d) ** s) * ((1 + kappa / lambda) ** (m - (s + 1))) }
        else if (S - s + 1 <= m && m <= S) { return (1 + kappa / lambda) * p(m - 1) - (d - b) * p(m - (S - s + 1)) }
    }

    const RR = lambda * p(s + 1)
    const P_c = p(0)

    const S_av = () => {
        let sum = 0
        for (let i = 1; i <= S; i++) {
            sum += i * p(i)
        }
        return sum
    }

    const V_av = () => {
        let sum = 0
        for (let i = 0; i <= S; i++) {
            sum += p(i)
        }
        return (S - s) * sum
    }


    return (
        <div>
            <div className='form'>
                <div className='form-input'>
                    <label><MathJax.Node formula={`\\nu`} /></label>
                    <input type='text' name='nu' value={nu} onChange={(e) => onChange(e, set_nu)} />
                </div>
                <div className='form-input'>
                    <label><MathJax.Node formula={`\\ \\kappa \\`} /></label>
                    <input type='text' name='kappa' value={kappa} onChange={(e) => onChange(e, set_kappa)} />
                </div>
                <div className='form-input'>
                    <label><MathJax.Node formula={`\\ \\lambda \\`} /></label>
                    <input type='text' name='lambda' value={lambda} onChange={(e) => onChange(e, set_lambda)} />
                </div>
                <div className='form-input'>
                    <label><MathJax.Node formula={`\\ s \\`} /></label>
                    <input type='text' name='s' value={s} onChange={(e) => onChange(e, set_s)} />
                </div>
                <div className='form-input'>
                    <label><MathJax.Node formula={`\\ S \\`} /></label>
                    <input type='text' name='S' value={S} onChange={(e) => onChange(e, set_S)} />
                </div>
            </div>

            <div className='results'>
                <MathJax.Node formula={`\\ 
                    RR = ${RR} \\\\
                    P_{c} = ${P_c} \\\\
                    S_{av} = ${S_av()} \\\\
                    V_{av} = ${V_av()} \\\\
                \\`} />
            </div>

            <div>
                <MathJax.Node formula={`\\ 
                    d = \\frac{\\nu + \\kappa}{\\lambda} \\quad
                    b = \\frac{\\kappa}{\\lambda}
                \\`} />

                <MathJax.Node formula={`\\ 
                    P(m) =
                        \\begin{cases}
                            \\frac{1+bc}{1+dc}  & \\quad \\text{if}\\quad m \\text{ = 0}\\\\
                            P(0)d - b  & \\quad \\text{if}\\quad m \\text{ = 1}\\\\
                            P(1)(1+d)^{m-1}  & \\quad \\text{if}\\quad 2 \\leq m \\leq s\\\\
                            P(1)(1 + \\frac{\\kappa}{\\lambda})^{m-(s-1)} (1+d)^{s}   & \\quad \\text{if}\\quad s+1 \\leq m \\leq S-s\\\\
                            P(m-1)(1 + \\frac{\\kappa}{\\lambda})-P(m-(S-s+1))(d-b)  & \\quad \\text{if}\\quad S-s+1 \\leq m \\leq S\\\\
                        \\end{cases}
                \\`} />

                <MathJax.Node formula={`\\ 
                    a_{m} = 
                        \\begin{cases}
                            (1+d)^{m-1} & \\quad \\text{if}\\quad 1 \\leq m \\leq s+1\\\\
                            (1+d)^{s}(1+b)^{m-s-1} & \\quad \\text{if}\\quad s+1 \\leq m \\leq S\\\\
                        \\end{cases}
                \\`} />

                <MathJax.Node formula={`\\ c = \\sum_{m=1}^{S} a_{m} \\`} />

                <MathJax.Node formula={`\\ 
                    S_{av} = \\sum_{m=1}^{S} mP(m) \\qquad
                    V_{av} = (S-s)\\sum_{m=0}^{S} P(m) \\qquad
                    RR = P(s+1)\\lambda \\qquad
                    P_{c} = P(0)  
                \\`} />
            </div>
        </div>
    )
}