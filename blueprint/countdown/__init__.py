from flask import Blueprint

countdown_bp = Blueprint("countdown",__name__, url_prefix="/countdown")


from . import views