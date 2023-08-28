const SkeletonItem: React.FC = () => {
  return (
    <div className="skeleton-item">
      <div className="ratio-img skeleton-item__img" />
      <div className="skeleton-item__content">
        <div className="skeleton-item__title" />
        <div className="skeleton-item__variations">
          <div className="skeleton-item__buttons" />
        </div>
        <div className="skeleton-item__purchase-wrapper" />
      </div>
    </div>
  )
}

export default SkeletonItem
