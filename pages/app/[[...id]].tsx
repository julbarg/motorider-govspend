import { Container, Dialog, Grid, Modal } from '@mui/material'
import type { GetServerSideProps, NextPage } from 'next'
import { DashboardSection } from 'components/molecules/DashboardSection'
import { DashboardContent } from 'components/molecules/DashboardContent'
import { DashboardNav } from 'components/molecules/DashboardNav'
import { getSession, useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import { Session } from 'next-auth'

type DashboardProps = {
  session: Session
}

const Dashboard: NextPage<DashboardProps> = (props) => {
  const [session, loading] = useSession()
  const router = useRouter()

  if (loading) {
    return null
  }

  if (!loading && !session) {
    return (
      <Dialog
        disableEscapeKeyDown={true}
        onClose={() => router.push('/')}
        open={true}
      ></Dialog>
    )
  }

  return (
    <Container
      maxWidth="lg"
      sx={{
        marginTop: 5,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <DashboardSection primary={true}>
            <DashboardNav user={session?.user} />
          </DashboardSection>
        </Grid>
        <Grid item xs={9}>
          <DashboardSection>
            <DashboardContent user={session?.user} />
          </DashboardSection>
        </Grid>
      </Grid>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  return {
    props: {
      session,
    },
  }
}

export default Dashboard
