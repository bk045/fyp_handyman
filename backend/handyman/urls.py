from django.urls import path, include
from rest_framework_nested import routers
from . import views

router = routers.DefaultRouter()

router.register('s-menu', views.ServiceMenuViewSet)
router.register('business-t', views.BusinessTypesViewSet)

# router.register('test', views.TestViewSet)
# User endpoint
router.register('users', views.AppUserViewSet, basename='users')
router.register('all_i_customer_with_name', views.AllIndividualCustomerWithNameViewSet, basename='all-i-customer')
router.register('all_b_customer_with_name', views.AllBusinessCustomerWithNameViewSet, basename='all-b-customer')
router.register('all_i_caterer_with_name', views.AllIndividualCatererWithNameViewSet, basename='all-i-caterer')
router.register('all_b_caterer_with_name', views.AllBusinessCatererWithNameViewSet, basename='all-b-caterer')
router.register('i_customer_with_name', views.IndividualCustomerWithNameViewSet)
router.register('b_customer_with_name', views.BusinessCustomerWithNameViewSet)
router.register('i_caterer_with_name', views.IndividualCatererWithNameViewSet)
router.register('b_caterer_with_name', views.BusinessCatererWithNameViewSet)
router.register('active_b_caterer_with_name', views.ActiveBusinessCatererWithNameViewSet, basename='active-b-caterer')
router.register('active_b_customer_with_name', views.ActiveBusinessCustomerWithNameViewSet, basename='active-b-customer')
router.register('active_i_customer_with_name', views.ActiveIndividualCustomerWithNameViewSet, basename='active-i-customer')
router.register('active_i_caterer_with_name', views.ActiveIndividualCatererWithNameViewSet, basename='active-i-caterer')
user_router = routers.NestedDefaultRouter(router, 'users', lookup='user')
user_router.register('profile', views.ProfileViewSet, basename='user-profile')
user_router.register('rating', views.UserRatingViewSet, basename='caterer-rating')
user_router.register('user_requests_with_name', views.SingleUserRequestWithNameViewSet, basename='req-name')
# Requests endpoint
router.register('requests_with_name', views.AllUserRequestWithNameViewSet,basename='requests-with-name')
router.register('requests', views.RequestsViewSet)
request_router = routers.NestedDefaultRouter(router,'requests', lookup='request')
request_router.register('request_accpted', views.RequestAccptedViewSet, basename='request-accpted')
request_router.register('request_declined', views.RequestDeclinedViewSet, basename='request-declined')
request_router.register('request_completed', views.RequestCompletedViewSet, basename='request-completed')
request_router.register('request_rating', views.RateRequestViewSet, basename='request-rating')
# Accpted Declined endpoint
router.register('accpted_requests', views.AccptedRequestViewSet)
router.register('declined_requests', views.DeclinedRequestViewSet)
router.register('decline_reasons', views.DeclineReasonsViewSet)
# router.register('request_data', views.RequestDataViewSet, basename='request_data')

# Services List endpoint

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),
    path('', include(user_router.urls)),
    path('', include(request_router.urls)),
    path('test/', views.home),
    path('cancelled_request_count/', views.cancelled_request_count, name='cancelled_request_count'),
    path('accepted_request_count/', views.accepted_request_count, name='accepted_request_count'),
    path('completed_request_count/', views.completed_request_count, name='completed_request_count'),
    path('placed_request_count/', views.placed_request_count, name='placed_request_count'),
    path('active_user_count/', views.active_user_count, name='active_user_count'),
    path('deleted_user_count/', views.deleted_user_count, name='deleted_user_count'),
    path('blocked_user_count/', views.blocked_user_count, name='blocked_user_count'),
    path('pending_user_count/', views.pending_user_count, name='pending_user_count'),
    path('active_i_caterer_count/', views.active_i_caterer_count, name='active_i_caterer_count'),
    path('active_i_customer_count/', views.active_i_customer_count, name='active_i_customer_count'),
    path('active_b_caterer_count/', views.active_b_caterer_count, name='active_b_caterer_count'),
    path('active_b_customer_count/', views.active_b_customer_count, name='active_b_customer_count'),

    # path('activate_account/<str:uid>/<str:token>', views.activate_account),
    # path('reset_password/<str:uid>/<str:token>', views.reset_password),
    # path ('check_user_status/', views.check_user_status)
]