import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import './PoliciesPage.css'

const policies = [
  {
    title: 'policyTitle1',
    description: 'policyDescription1'
  },
  {
    title: 'policyTitle2',
    description: 'policyDescription2'
  },
  {
    title: 'policyTitle3',
    description: 'policyDescription3'
  },
  {
    title: 'policyTitle4',
    description: 'policyDescription4'
  },
  {
    title: 'policyTitle5',
    description: 'policyDescription5'
  },
  {
    title: 'policyTitle6',
    description: 'policyDescription6'
  },
  {
    title: 'policyTitle7',
    description: 'policyDescription7'
  },
  {
    title: 'policyTitle8',
    description: 'policyDescription8'
  },
  {
    title: 'policyTitle9',
    description: 'policyDescription9'
  },
  {
    title: 'policyTitle10',
    description: 'policyDescription10'
  }
]

const PoliciesPage = () => {
  const { t } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className='main-page mt-[68px]'>
      <div className='main-section flex flex-col text-white gap-4'>
        <h1 className='title underline mt-3'>Políticas de Uso</h1>
        <div className='policy-columns'>
          {policies.map((policy, index) => (
            <div key={index} className='policy-card'>
              <h3 className='policy-title'>{t(policy.title)}</h3>
              <p className='policy-description'>{t(policy.description)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PoliciesPage
