import React, { FC } from 'react'

type TCampaignDescriptionProps = {
  text: string
}

const CampaignDescription: FC<TCampaignDescriptionProps> = ({ text }) => {
  return (
    <div>
      {text.split('\n').map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </div>
  )
}

export default CampaignDescription
