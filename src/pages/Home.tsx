import { useTranslation } from 'react-i18next'
import '../i18n.js'
import Typography from '@mui/material/Typography'

const Home = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <Typography component="h1" variant="h3" color="text.primary" gutterBottom>
      {t('your_library.label')}
    </Typography>
  )
}

export default Home
