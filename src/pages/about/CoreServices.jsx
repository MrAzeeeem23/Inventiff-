import Container from '@/components/container/Container'
import React from 'react'

function CoreServices({ CoreService }) {

    const CoreService = [
        {
            service: "Data Science Consulting"
        },
        {

        }
    ]

  return (
    <>
        <Container>
            <div className='w-full grid grid-cols-5 '>
                {
                    CoreService.map((cs) => (
                        <div className=''>

                        </div>
                    ))
                }
            </div>
        </Container>
    </>
  )
}

export default CoreServices