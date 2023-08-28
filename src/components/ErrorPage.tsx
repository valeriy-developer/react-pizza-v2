const ErrorPage: React.FC = () => {
  return (
    <div className="error-page">
      <h2 className="error-page__title">Виникла помилка 😕</h2>
      <p className="error-page__description">
        На жаль, не вдалося завантажити список товарів, спробуйте пізніше...
      </p>
    </div>
  )
}

export default ErrorPage
