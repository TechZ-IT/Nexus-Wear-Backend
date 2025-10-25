export enum CustomerStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  SUSPENDED = 'suspended',
  DELETED = 'deleted',
}

export enum AdminStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  DELETED = 'deleted',
}

export enum ProductStatus {
  PUBLISHED = 'published',
  OUT_OF_STOCK = 'out_of_stock',
  IN_STOCK = 'in_stock',
  DISCONTINUED = 'discontinued',
  UP_COMING = 'up_coming',
}

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  RETURNED = 'returned',
  DELIVERED = 'delivered',
  REFUNDED = 'refunded',
}
export enum PaymentType {
  COD = 'COD',
  SSL = 'SSL',
  STRIPE = 'STRIPE',
  PAYPAL = 'PAYPAL',
}

export enum PaymentStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum CampaignStatus {
  UPCOMING = 'upcoming',
  ACTIVE = 'active',
  EXPIRED = 'expired',
  PAUSED = 'paused',
}
