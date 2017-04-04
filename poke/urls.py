from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^next/$', views.next, name='ajax_next'),
    url(r'^previous/$', views.previous, name='ajax_previous'),
    url(r'^detail/$', views.poke_detail, name='ajax_detail'),
    url(r'^analytics/$', views.analytics, name='analytics'),
]
